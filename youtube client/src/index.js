import App from './controllers/App';

const search = 'cats';

const app = new App('https://www.googleapis.com/youtube/v3/search?', 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y', search);

app.start();
