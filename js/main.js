import {similarAdverts} from './data.js';
import {setFormListeners} from './form.js';
import {createAdMarker} from './map.js';

similarAdverts.forEach((dataAd) => createAdMarker(dataAd));

setFormListeners();
