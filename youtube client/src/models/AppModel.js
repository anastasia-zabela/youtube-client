class ClipModel {
  constructor(queryUrl) {
    this.url = queryUrl;
  }

  static exstractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  static exstractClipPictures(data) {
    return data.items.map(clip => clip.snippet.thumbnails.medium.url);
  }

  static exstractClipDescriptions(data) {
    return data.items.map(clip => clip.snippet.description);
  }

  static exstractClipAuthor(data) {
    return data.items.map(clip => clip.snippet.channelTitle);
  }

  static exstractClipDate(data) {
    return data.items.map(clip => clip.snippet.publishedAt);
  }

  async getClipData() {
    const finalUrl = this.url;

    const response = await fetch(finalUrl);
    const requestData = await response.json();

    const data = {
      title: ClipModel.exstractClipNames(requestData),
      picture: ClipModel.exstractClipPictures(requestData),
      description: ClipModel.exstractClipDescriptions(requestData),
      author: ClipModel.exstractClipAuthor(requestData),
      date: ClipModel.exstractClipDate(requestData),
      videoId: 5,
      views: 5,
    };

    return data;
  }
}

export default ClipModel;
