import EventEmitter from 'events';
import BeaconScanner from 'node-beacon-scanner';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const ADVERTISE_EVENT = 'advertise';
const COLORS = {
  'A495BB10-C5B1-4B44-B512-1370F02D74DE': 'Red',
  'A495BB20-C5B1-4B44-B512-1370F02D74DE': 'Green',
  'A495BB30-C5B1-4B44-B512-1370F02D74DE': 'Black',
  'A495BB40-C5B1-4B44-B512-1370F02D74DE': 'Purple',
  'A495BB50-C5B1-4B44-B512-1370F02D74DE': 'Orange',
  'A495BB60-C5B1-4B44-B512-1370F02D74DE': 'Blue',
  'A495BB70-C5B1-4B44-B512-1370F02D74DE': 'Yellow',
  'A495BB80-C5B1-4B44-B512-1370F02D74DE': 'Pink',
};

class BeaconEmitter extends EventEmitter {}

export default class Tilt {
  constructor() {
    this.beaconEmitter = new BeaconEmitter();
  }

  observe() {
    return fromEvent(this.beaconEmitter, ADVERTISE_EVENT)
      .pipe(
        filter(ad => ad.beaconType == "iBeacon"),
        filter(ad => ad.iBeacon.uuid in COLORS),
        map(ad => tiltData(ad.iBeacon)),
      );
  }

  startScanning() {
    const scanner = new BeaconScanner();

    scanner.onadvertisement = (ad) => {
        console.log('Got an iBeacon advertisement');
        this.beaconEmitter.emit(ADVERTISE_EVENT, ad);
    };

    return scanner.startScan();
  }
}

function tiltData(iBeacon) {
  return {
    "color": COLORS[iBeacon.uuid],
    "temperature": iBeacon.major,
    "gravity": iBeacon.minor / 1000,
  };
}
