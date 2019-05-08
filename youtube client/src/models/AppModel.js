class ClipModel {
  constructor(queryUrl) {
    this.url = queryUrl;
  }

  static exstractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipData() {
    const finalUrl = this.url;

    const response = await fetch(finalUrl);
    const requestData = await response.json();

    const data = {
      title: ClipModel.exstractClipNames(requestData),
    };

    return data;
  }
}

export default ClipModel;
