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
      this.view.renderError();
    }
  }

  async reprocessUserRequest() {
    if (this.nextPageToken) {
      const queryUrl = `${this.finalUrlForSearch}&q=${this.query}&pageToken=${this.nextPageToken}`;
      const model = new ClipModel(queryUrl, this.finalUrlForViews);
      const data = await model.getClipData();
      this.setPageToken = data.nextPageToken;
      this.view.setData = data;
      this.view.clips.classList.remove('smooth');
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
    const countClips = this.view.clips.children.length;
    const countPage = this.view.clips.children.length / 4;
    const countPageForTab = this.view.clips.children.length / 3;
    const countPageForTab2 = this.view.clips.children.length / 2;
    const countPageForMobil = this.view.clips.children.length / 1;
    this.setCountPage = countPage;
    this.view.clips.style.setProperty('--n', countPage);
    this.view.clips.style.setProperty('--p', countPageForTab);
    this.view.clips.style.setProperty('--pm', countPageForTab2);
    this.view.clips.style.setProperty('--m', countPageForMobil);
    this.view.clips.style.setProperty('--c', countClips);
    return countPage;
  }

  addScrolling() {
    const {
      prevPrevNumPage,
      prevNumPage,
      numPage,
      nextNumPage,
    } = this.view.sliderBtn;
    const { slider } = this.view;
    const { clips } = this.view;

    const chekRepeatToken = [];
    let clickX = null;
    let locked = false;
    let indexClips = 0;
    let dataPrevPrevPage = 0;
    let dataPrevPage = 0;
    let dataCurrentPage = 0;
    let dataNextPage = 0;

    const handleReload = App.bind(this.reprocessUserRequest, this);

    function addTooltip() {
      this.classList.add('tooltip');
    }

    function removeTooltip() {
      this.classList.remove('tooltip');
    }

    function getCurrentCountPage() {
      const countPage = document.querySelector('.clips-contain').children.length / 4;
      return countPage;
    }

    function handleTouchEvent(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    function handleMousedown(e) {
      clickX = handleTouchEvent(e).clientX;
      clips.classList.toggle('smooth', !(locked = true));
    }

    function handleMove(e) {
      e.preventDefault();

      if (locked) {
        clips.style.setProperty('--tx', `${Math.round(handleTouchEvent(e).clientX - clickX)}px`);
      }
    }

    function getCurrentPage(sign, lockeds, countPage) {
      locked = lockeds;
      if ((indexClips > 0 || sign < 0) && (indexClips < countPage - 1 || sign > 0)) {
        indexClips -= sign;
        const index = indexClips;
        clips.style.setProperty('--i', index);
        dataCurrentPage = index + 1;
        numPage.innerText = dataCurrentPage;
        dataPrevPrevPage = dataCurrentPage - 2;
        dataPrevPage = dataCurrentPage - 1;
        dataNextPage = dataCurrentPage + 1;

        if (index === 0 && sign > 0) {
          if (document.getElementsByClassName('slider__prev-page')[0]) {
            slider.removeChild(prevNumPage);
          }
        }
        if (index === 1 && sign < 0) {
          if (document.getElementsByClassName('slider__prev-page')[0] === undefined) {
            slider.insertAdjacentElement('afterbegin', prevNumPage);
          }
        }
        if (index === 1 && sign > 0) {
          if (document.getElementsByClassName('slider__prev-prev-page')[0]) {
            slider.removeChild(prevPrevNumPage);
          }
        }
        if (index === 2 && sign < 0) {
          if (document.getElementsByClassName('slider__prev-prev-page')[0] === undefined) {
            slider.insertAdjacentElement('afterbegin', prevPrevNumPage);
          }
        }
      }
      clips.style.setProperty('--tx', '0px');
      clips.classList.toggle('smooth', !(locked = false));
      prevPrevNumPage.setAttribute('data-num-page', dataPrevPrevPage);
      prevNumPage.setAttribute('data-num-page', dataPrevPage);
      nextNumPage.setAttribute('data-num-page', dataNextPage);
      return indexClips;
    }

    function checkNextPage(sign) {
      const currentCountPage = getCurrentCountPage();
      const reloadPage = document.querySelector('.clips-contain').children.length >= 15 ? Math.floor(currentCountPage) : Math.ceil(currentCountPage);

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

    clips.addEventListener('mousedown', handleMousedown);
    clips.addEventListener('touchstart', handleMousedown);

    clips.addEventListener('mousemove', handleMove);
    clips.addEventListener('touchmove', handleMove);

    clips.addEventListener('mouseup', handleMouseUp);
    clips.addEventListener('touchend', handleMouseUp);

    prevPrevNumPage.addEventListener('click', getPrevPrevPage);
    prevNumPage.addEventListener('click', getPrevPage);
    nextNumPage.addEventListener('click', getNextPage);

    prevPrevNumPage.addEventListener('mousedown', addTooltip);
    prevNumPage.addEventListener('mousedown', addTooltip);
    nextNumPage.addEventListener('mousedown', addTooltip);

    prevPrevNumPage.addEventListener('mouseup', removeTooltip);
    prevNumPage.addEventListener('mouseup', removeTooltip);
    nextNumPage.addEventListener('mouseup', removeTooltip);
  }
}

export default App;
