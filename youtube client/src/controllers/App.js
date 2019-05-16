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
    const { nextPageToken } = data;
    this.setPageToken = nextPageToken;
    this.view.setData = data;
    this.view.renderClipContain();
    this.getCountPage();
    this.view.renderPageButtons();
    this.addScrolling();
  }

  async reprocessUserRequest() {
    const queryUrl = `${this.finalUrlForSearch}&q=${this.query}&pageToken=${this.nextPageToken}`;
    const model = new ClipModel(queryUrl, this.finalUrlForViews);
    const data = await model.getClipData();
    this.setPageToken = data.nextPageToken;
    this.view.setData = data;
    this.view.clips.classList.remove('smooth');
    this.view.renderClipCards();
    this.getCountPage();
  }

  static bind(func, context) {
    return function a() {
      return func.apply(context);
    };
  }

  getCountPage() {
    const countClips = this.view.clips.children.length;
    const countPage = this.view.clips.children.length / 4;
    this.setCountPage = countPage;
    this.view.clips.style.setProperty('--n', countPage);
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

    function getCurrentCountPage() {
      const countPage = document.querySelector('.clips-contain').children.length / 4;
      return countPage;
    }

    let clickX = null;
    let locked = false;
    let indexClips = 0;
    const chekRepeatToken = [];

    const handleReload = App.bind(this.reprocessUserRequest, this);

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
        numPage.innerText = index + 1;

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
      return indexClips;
    }

    function handleMouseUp(e) {
      if (locked) {
        const difClickX = handleTouchEvent(e).clientX - clickX;
        const sign = Math.sign(difClickX);
        const currentCountPage = getCurrentCountPage();
        const reloadPage = Math.floor(currentCountPage);

        const index = getCurrentPage(sign, locked, currentCountPage);
        if (index + 1 === reloadPage && !chekRepeatToken.includes(reloadPage)) {
          chekRepeatToken.push(reloadPage);
          handleReload();
        }
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
      const currentCountPage = getCurrentCountPage();
      const reloadPage = Math.floor(currentCountPage);

      const index = getCurrentPage(sign, locked, currentCountPage);
      if (index + 1 === reloadPage && !chekRepeatToken.includes(reloadPage)) {
        chekRepeatToken.push(reloadPage);
        handleReload();
      }
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
  }
}

export default App;
