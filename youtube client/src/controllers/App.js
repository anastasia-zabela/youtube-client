import ClipModel from '../models/AppModel';
import AppView from '../views/AppView';

class App {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
    this.finalUrl = `${url}key=${apiKey}&type=video&part=snippet`;
    this.view = new AppView();
  }

  start() {
    this.view.startRender();
  }

  async processUserRequest(query, numOfItems) {
    const queryUrl = `${this.finalUrl}&q=${query}&maxResults=${numOfItems}`;
    const model = new ClipModel(queryUrl);
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
