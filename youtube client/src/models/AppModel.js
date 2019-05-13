class ClipModel {
  constructor(queryUrl, idUrl) {
    this.urlSearch = queryUrl;
    this.urlViews = idUrl;
  }

  static exstractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  static exstractClipPictures(data) {
    return data.items.map(clip => clip.snippet.thumbnails.medium.url);
  }

  static exstractClipDescriptions(data) {
    return data.items.map(clip => clip.snippet.description || 'No description');
  }

  static exstractClipAuthor(data) {
    return data.items.map(clip => clip.snippet.channelTitle);
  }

  static exstractClipDate(data) {
    return data.items.map(clip => clip.snippet.publishedAt);
  }

  static exstractClipId(data) {
    return data.items.map(clip => clip.id.videoId);
  }

  static exstractClipUrl(data) {
    return data.items.map(clip => `https://www.youtube.com/watch?v=${clip.id.videoId}`);
  }

  async exstractClipViews(data) {
    const videoId = data.items.map(clip => clip.id.videoId).join(',');
    const finalUrl = `${this.urlViews}&id=${videoId}`;

    const response = await fetch(finalUrl);
    const requestData = await response.json();

    const views = requestData.items.map(clip => clip.statistics.viewCount);
    return views;
  }

  async getClipData() {
    const finalUrl = this.urlSearch;

    const response = await fetch(finalUrl);
    const requestData = await response.json();

    const data = {
      title: ClipModel.exstractClipNames(requestData),
      picture: ClipModel.exstractClipPictures(requestData),
      description: ClipModel.exstractClipDescriptions(requestData),
      author: ClipModel.exstractClipAuthor(requestData),
      date: ClipModel.exstractClipDate(requestData),
      videoId: ClipModel.exstractClipId(requestData),
      url: ClipModel.exstractClipUrl(requestData),
      views: await this.exstractClipViews(requestData),
    };

    return data;
  }
}

export default ClipModel;
