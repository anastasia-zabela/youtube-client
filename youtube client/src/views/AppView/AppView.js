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
    function getClipView(title) {
      const clip = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.innerText = title;
      clip.appendChild(h3);
      newClips.appendChild(clip);
    }
    this.data.title.map(getClipView);
  }
}

export default AppView;
