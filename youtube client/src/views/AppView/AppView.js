/* eslint-disable class-methods-use-this */
class AppView {
  constructor() {
    this.data = [];
    this.indexClips = 0;
    this.clips = null;
  }

  set setData(data) {
    this.data = data;
  }

  set setIndex(index) {
    this.indexClips = index;
  }

  startRender() {
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1');
    meta.setAttribute('name', 'viewport');
    document.head.appendChild(meta);
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://use.fontawesome.com/releases/v5.8.2/css/all.css');
    link.setAttribute('integrity', 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay');
    link.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(link);
    const input = document.createElement('input');
    const loupe = document.createElement('div');
    const search = document.createElement('div');
    search.classList.add('search');
    loupe.classList.add('fas');
    loupe.classList.add('fa-search');
    search.appendChild(loupe);
    search.appendChild(input);
    document.body.appendChild(search);
    this.search = search;
  }

  renderClipContain() {
    const oldClips = document.getElementsByClassName('clips-contain')[0];
    if (oldClips !== undefined) {
      document.body.removeChild(oldClips);
    }
    const newClips = document.createElement('div');
    newClips.classList.add('clips-contain');
    this.clips = newClips;
    this.search.insertAdjacentElement('afterend', this.clips);
    this.renderClipCards();
  }

  renderClipCards() {
    for (let i = 0; i < 15; i += 1) {
      const clip = document.createElement('div');
      const title = document.createElement('a');
      const picture = document.createElement('img');
      const descr = document.createElement('h3');
      const clipInfo = document.createElement('div');
      const author = document.createElement('h4');
      const date = document.createElement('h4');
      const views = document.createElement('h4');
      const iconDate = document.createElement('div');
      const iconAuthor = document.createElement('div');
      const iconView = document.createElement('div');
      clip.classList.add('clips-contain__clip');
      clipInfo.classList.add('clips-contain__clip-info');
      title.innerHTML = this.data.title[i];
      title.setAttribute('href', this.data.url[i]);
      title.setAttribute('target', '_block');
      picture.setAttribute('src', this.data.picture[i]);
      descr.innerHTML = this.data.description[i];
      author.innerHTML = this.data.author[i];
      date.innerHTML = this.data.date[i].slice(0, 10);
      views.innerHTML = this.data.views[i];
      iconDate.classList.add('fas');
      iconAuthor.classList.add('fas');
      iconView.classList.add('fas');
      iconDate.classList.add('fa-calendar-alt');
      iconAuthor.classList.add('fa-user-circle');
      iconView.classList.add('fa-glasses');
      clip.appendChild(picture);
      clip.appendChild(title);
      clip.appendChild(descr);
      clipInfo.appendChild(iconAuthor);
      clipInfo.appendChild(author);
      clipInfo.appendChild(iconDate);
      clipInfo.appendChild(date);
      clipInfo.appendChild(iconView);
      clipInfo.appendChild(views);
      clip.appendChild(clipInfo);
      this.clips.appendChild(clip);
    }
  }

  renderPageButtons() {
    const oldSlider = document.getElementsByClassName('slider-contain')[0];
    if (oldSlider !== undefined) {
      document.body.removeChild(oldSlider);
    }
    const slider = document.createElement('div');
    const prevPrevNumPage = document.createElement('button');
    const prevNumPage = document.createElement('button');
    const numPage = document.createElement('button');
    const nextNumPage = document.createElement('button');

    slider.classList.add('slider-contain');
    numPage.classList.add('slider__current-page');
    prevNumPage.classList.add('slider__prev-page');
    prevPrevNumPage.classList.add('slider__prev-prev-page');

    numPage.innerText = 1;

    slider.appendChild(numPage);
    slider.appendChild(nextNumPage);

    document.body.appendChild(slider);

    this.slider = slider;
    this.sliderBtn = {
      prevPrevNumPage,
      prevNumPage,
      numPage,
      nextNumPage,
    };
  }
}

export default AppView;
