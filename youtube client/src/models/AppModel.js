export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static exstractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipNames() {
    const finalUrl = this.state;

    const response = await fetch(finalUrl);
    const data = await response.json();

    return AppModel.exstractClipNames(data);
  }
}
