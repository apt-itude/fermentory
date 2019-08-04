import { throttleTime } from 'rxjs/operators';
import Tilt from './tilt.js';

const tilt = new Tilt();

tilt.observe()
  .pipe(throttleTime(5000))
  .subscribe(advertisement => {
    console.log(JSON.stringify(advertisement, null, '  '));
  });

tilt.startScanning().then(() => {
  console.log('Started to scan.')  ;
}).catch((error) => {
  console.error(error);
});
