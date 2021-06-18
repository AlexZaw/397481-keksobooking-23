import {createAds} from './create-ads.js';
import { enablePage } from './map.js';
const map = document.querySelector('#map-canvas');
const ads = createAds();

enablePage();
map.append(ads[0]);
