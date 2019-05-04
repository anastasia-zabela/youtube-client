import AppModel from '../models/AppModel';
import AppView from '../views/AppView';

export default class App {
  constructor(url, apiKey, q) {
    this.url = url;
    this.apiKey = apiKey;
    this.q = q;
    this.finalUrl = `${url}key=${apiKey}&type=video&part=snippet&maxResults=15&q=${q}`;
  }

  async start() {
    const model = new AppModel(this.finalUrl);
    const data = await model.getClipNames();
    global.console.log(await data);

    const view = new AppView(data);

    view.render();
  }
}
