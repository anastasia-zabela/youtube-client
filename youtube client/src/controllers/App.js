import ClipModel from '../models/AppModel';
import AppView from '../views/AppView';

class App {
  constructor(urlSearch, urlView, apiKey) {
    this.urlSearch = urlSearch;
    this.urlView = urlView;
    this.apiKey = apiKey;
    this.finalUrlForSearch = `${urlSearch}key=${apiKey}&type=video&part=snippet`;
    this.finalUrlForViews = `${urlView}key=${apiKey}&part=snippet,statistics`;
    this.view = new AppView();
  }

  start() {
    this.view.startRender();
  }

  async processUserRequest(query, numOfItems) {
    const queryUrl = `${this.finalUrlForSearch}&q=${query}&maxResults=${numOfItems}`;
    const model = new ClipModel(queryUrl, this.finalUrlForViews);
    const data = await model.getClipData();
    this.view.setData = data;
    this.view.renderClipCards();
    this.view.renderPageButtons();
    this.addScrolling();
    global.console.log(await data);
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

    const countPage = this.view.clips.children.length / 4;
    this.view.clips.style.setProperty('--n', countPage);

    let clickX = null;
    let locked = false;
    let indexClips = 0;

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

    function getCurrentPage(sign) {
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
    }

    function handleMouseUp(e) {
      if (locked) {
        const difClickX = handleTouchEvent(e).clientX - clickX;
        const sign = Math.sign(difClickX);

        getCurrentPage(sign, locked);
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

      getCurrentPage(sign, locked);
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
