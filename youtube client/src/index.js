import App from './controllers/App';

const apiDestinationUrl = 'https://www.googleapis.com/youtube/v3/search?';
const apiKey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';

const app = new App(apiDestinationUrl, apiKey);

app.start();

const inputRequest = document.getElementsByTagName('input')[0];
const getUserRequest = () => {
  app.processUserRequest(inputRequest.value, 15);
};
inputRequest.addEventListener('keyup', getUserRequest);