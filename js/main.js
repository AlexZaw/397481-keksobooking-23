import { createAds } from './create-ads.js';
import { disablePage, enablePage } from './map.js';
import { initAdFormValidation } from './ad-form-validation.js';
const map = document.querySelector('#map-canvas');
const ads = createAds();

disablePage();
enablePage();
map.append(ads[0]);
initAdFormValidation();
