import App from './controllers/App';

const apiSearchUrl = 'https://www.googleapis.com/youtube/v3/search?';
const apiViewUrl = 'https://www.googleapis.com/youtube/v3/videos?';
const apiKey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';

const app = new App(apiSearchUrl, apiViewUrl, apiKey);

app.start();
