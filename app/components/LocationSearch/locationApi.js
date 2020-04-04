import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.locationiq.com/v1/autocomplete.php',
  responseType: 'json',
  method: 'get',
});
