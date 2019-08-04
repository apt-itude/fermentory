import axios from 'axios';

const BASE_URL = 'https://log.brewersfriend.com';
const STREAM_URL = BASE_URL + "/stream";

export default class BrewersFriendClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  postStream(data) {
    const url = `${STREAM_URL}/${this.apiKey}`;
    return axios.post(url, data);
  }
}
