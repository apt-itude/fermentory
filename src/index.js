import { map, throttleTime } from 'rxjs/operators';

import { tiltToBrewersFriend } from './adapters.js';
import BrewersFriendClient from './brewersfriend.js';
import Tilt from './tilt.js';

const BF_PUBLISH_INTERVAL = 1200000;

if (!process.env.BREWERS_FRIEND_API_KEY) {
  console.error('BREWERS_FRIEND_API_KEY environment variable is not set');
  process.exit(1);
}

const bfClient = new BrewersFriendClient(process.env.BREWERS_FRIEND_API_KEY);
const tilt = new Tilt();

tilt.observe()
  .pipe(
    throttleTime(BF_PUBLISH_INTERVAL),
    map(tiltToBrewersFriend),
  )
  .subscribe(data => {
    console.log(JSON.stringify(data, null, '  '));
    bfClient.postStream(data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  });

tilt.startScanning().then(() => {
  console.log('Started to scan.')  ;
}).catch((error) => {
  console.error(error);
});
