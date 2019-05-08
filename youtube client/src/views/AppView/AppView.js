/* eslint-disable class-methods-use-this */
class AppView {
  constructor() {
    this.data = [];
  }

  set setData(data) {
    this.data = data;
  }

  startRender() {
    document.body.appendChild(document.createElement('input'));
  }

  renderClipCards() {
    const oldClips = document.getElementsByTagName('div')[0];
    if (oldClips !== undefined) {
      document.body.removeChild(oldClips);
    }
    const newClips = document.createElement('div');
    newClips.classList.add('clips-contain');
    document.body.appendChild(newClips);
    for (let i = 0; i < 15; i += 1) {
      const clip = document.createElement('div');
      const title = document.createElement('h2');
      const picture = document.createElement('img');
      const descr = document.createElement('h3');
      const author = document.createElement('h3');
      const date = document.createElement('h3');
      title.innerText = this.data.title[i];
      picture.setAttribute('src', this.data.picture[i]);
      descr.innerText = this.data.description[i];
      author.innerText = this.data.author[i];
      date.innerText = this.data.date[i].slice(0, 10);
      clip.appendChild(title);
      clip.appendChild(picture);
      clip.appendChild(descr);
      clip.appendChild(author);
      clip.appendChild(date);
      newClips.appendChild(clip);
    }
  }
}

export default AppView;
