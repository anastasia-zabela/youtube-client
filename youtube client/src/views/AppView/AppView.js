/* eslint-disable class-methods-use-this */
class AppView {
  constructor() {
    this.data = [];
  }

  set setData(data) {
    this.data = data;
  }

  startRender() {
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
  }

  renderClipCards() {
    const oldClips = document.getElementsByTagName('div')[1];
    if (oldClips !== undefined) {
      document.body.removeChild(oldClips);
    }
    const newClips = document.createElement('div');
    newClips.classList.add('clips-contain');
    document.body.appendChild(newClips);
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
      title.innerText = this.data.title[i];
      title.setAttribute('href', this.data.url[i]);
      title.setAttribute('target', '_block');
      picture.setAttribute('src', this.data.picture[i]);
      descr.innerText = this.data.description[i];
      author.innerText = this.data.author[i];
      date.innerText = this.data.date[i].slice(0, 10);
      views.innerText = this.data.views[i];
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
      newClips.appendChild(clip);
    }
  }
}

export default AppView;
