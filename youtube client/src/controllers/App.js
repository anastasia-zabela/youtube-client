import $ from 'jquery';

import ClipModel from '../models/AppModel';
import AppView from '../views/AppView';

class App {
  constructor(urlSearch, urlView, apiKey) {
    this.urlSearch = urlSearch;
    this.urlView = urlView;
    this.apiKey = apiKey;
    this.finalUrlForSearch = `${urlSearch}key=${apiKey}&type=video&part=snippet&maxResults=15`;
    this.finalUrlForViews = `${urlView}key=${apiKey}&part=snippet,statistics`;
    this.view = new AppView();
    this.tokens = {};
  }

  start() {
    this.view.startRender();
    const inputRequest = document.getElementsByTagName('input')[0];
    const getUserRequest = () => {
      this.processUserRequest(inputRequest.value);
    };
    inputRequest.addEventListener('input', getUserRequest);
  }

  set setQuery(query) {
    this.query = query;
  }

  set setPageToken(token) {
    this.nextPageToken = token;
  }

  set setCountPage(page) {
    this.countPage = page;
  }

  async processUserRequest(query) {
    this.setQuery = query;
    const queryUrl = `${this.finalUrlForSearch}&q=${this.query}`;
    const model = new ClipModel(queryUrl, this.finalUrlForViews);
    const data = await model.getClipData();
    if (data.author[0]) {
      const { nextPageToken } = data;
      this.setPageToken = nextPageToken;
      this.view.setData = data;
      this.view.renderClipContain();
      this.getCountPage();
      this.view.renderPageButtons();
      this.addScrolling();
    } else {
      AppView.renderError();
    }
  }

  async reprocessUserRequest() {
    if (this.nextPageToken) {
      const queryUrl = `${this.finalUrlForSearch}&q=${this.query}&pageToken=${this.nextPageToken}`;
      const model = new ClipModel(queryUrl, this.finalUrlForViews);
      const data = await model.getClipData();
      this.setPageToken = data.nextPageToken;
      this.view.setData = data;
      this.view.clips.removeClass('smooth');
      this.view.renderClipCards();
      this.getCountPage();
    }
  }

  static bind(func, context) {
    return function a() {
      return func.apply(context);
    };
  }

  getCountPage() {
    const countClips = this.view.clips[0].children.length;
    const countPage = this.view.clips[0].children.length / 4;
    const countPageForTab = this.view.clips[0].children.length / 3;
    const countPageForTab2 = this.view.clips[0].children.length / 2;
    const countPageForMobil = this.view.clips[0].children.length / 1;
    this.setCountPage = countPage;
    this.view.clips.css('--n', countPage);
    this.view.clips.css('--p', countPageForTab);
    this.view.clips.css('--pm', countPageForTab2);
    this.view.clips.css('--m', countPageForMobil);
    this.view.clips.css('--c', countClips);
    return countPage;
  }

  addScrolling() {
    const {
      prevPrevNumPage,
      prevNumPage,
      numPage,
      nextNumPage,
    } = this.view.sliderBtn;
    const { clips } = this.view;

    const chekRepeatToken = [];
    let clickX = null;
    let locked = false;
    let indexClips = 0;
    let dataCurrentPage = 0;

    const handleReload = App.bind(this.reprocessUserRequest, this);

    function getCurrentCountPage() {
      const countPage = $('.clips-contain')[0].children.length / 4;
      return countPage;
    }

    function handleTouchEvent(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    function handleMousedown(e) {
      clickX = handleTouchEvent(e).clientX;
      clips.toggleClass('smooth', !(locked = true));
    }

    function handleMove(e) {
      e.preventDefault();

      if (locked) {
        clips.css('--tx', `${Math.round(handleTouchEvent(e).clientX - clickX)}px`);
      }
    }

    function getCurrentPage(sign, lockeds, countPage) {
      locked = lockeds;
      if ((indexClips > 0 || sign < 0) && (indexClips < countPage - 1 || sign > 0)) {
        indexClips -= sign;
        const index = indexClips;
        clips.css('--i', index);
        numPage.text(dataCurrentPage = index + 1);
        prevNumPage.text(dataCurrentPage - 1);
        prevPrevNumPage.text(dataCurrentPage - 2);
        nextNumPage.text(dataCurrentPage + 1);

        if (index === 0 && sign > 0) {
          if ($('.slider__prev-page').length) {
            prevNumPage.detach();
          }
        }
        if (index === 1 && sign < 0) {
          if (!$('.slider__prev-page').length) {
            prevNumPage.insertBefore(numPage);
          }
        }
        if (index === 1 && sign > 0) {
          if ($('.slider__prev-prev-page').length) {
            prevPrevNumPage.detach();
          }
        }
        if (index === 2 && sign < 0) {
          if (!$('.slider__prev-prev-page').length) {
            prevPrevNumPage.insertBefore(prevNumPage);
          }
        }
      }
      clips.css('--tx', '0px');
      clips.toggleClass('smooth', !(locked = false));
      return indexClips;
    }

    function checkNextPage(sign) {
      const currentCountPage = getCurrentCountPage();
      const reloadPage = $('.clips-contain')[0].children.length >= 15 ? Math.floor(currentCountPage) : Math.ceil(currentCountPage);

      const index = getCurrentPage(sign, locked, currentCountPage);
      if (index + 1 === reloadPage && !chekRepeatToken.includes(reloadPage)) {
        chekRepeatToken.push(reloadPage);
        handleReload();
      }
    }

    function handleMouseUp(e) {
      if (locked) {
        const difClickX = handleTouchEvent(e).clientX - clickX;
        const sign = Math.sign(difClickX);
        checkNextPage(sign);
      }
    }

    function getPrevPrevPage() {
      locked = true;
      let sign = 1;
      getCurrentPage(sign, locked);

      locked = true;
      sign = 1;
      getCurrentPage(sign, locked);
    }

    function getPrevPage() {
      locked = true;
      const sign = 1;
      getCurrentPage(sign, locked);
    }

    function getNextPage() {
      locked = true;
      const sign = -1;
      checkNextPage(sign);
    }

    clips
      .mousedown(handleMousedown)
      .mousemove(handleMove)
      .mouseup(handleMouseUp)
      .on('touchstart', handleMousedown)
      .on('touchmove', handleMove)
      .on('touchend', handleMouseUp);

    nextNumPage.click(getNextPage);
    prevNumPage.click(getPrevPage);
    prevPrevNumPage.click(getPrevPrevPage);
  }
}

export default App;
