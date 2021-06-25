import {disableForm} from './form-control.js';
import { createSimilarAds } from './create-similar-ads.js';
import { initAdFormValidation } from './ad-form-validation.js';
import { initMap, createMarkersGroup } from './map.js';

const similarAds = createSimilarAds();
disableForm();
initMap();
createMarkersGroup(similarAds);
initAdFormValidation();
