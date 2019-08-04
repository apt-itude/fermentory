import config from 'config-yml';
import { map, throttleTime } from 'rxjs/operators';

import { tiltToBrewersFriend } from './adapters.js';
import BrewersFriendClient from './brewersfriend.js';
import Tilt from './tilt.js';

const BF_PUBLISH_INTERVAL = 1200000;

const bfClient = new BrewersFriendClient(config.brewersfriend.apiKey);
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
