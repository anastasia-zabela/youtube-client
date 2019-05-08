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
    global.console.log(await data);
  }

  viewClipCards() {
    this.view.renderClipCards();
  }
}

export default App;
