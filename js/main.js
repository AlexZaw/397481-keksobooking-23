import './form-control.js';
import { createSimilarAds } from './create-similar-ads.js';
import { initAdFormValidation } from './ad-form-validation.js';
import { createMarkersGroup } from './map.js';

const similarAds = createSimilarAds();

createMarkersGroup(similarAds);
initAdFormValidation();
