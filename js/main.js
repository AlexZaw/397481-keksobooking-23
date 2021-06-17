import {createAdsElements} from './create-ads-elements.js';
const outputAdElement = document.querySelector('#map-canvas');

const adsElementsArray = createAdsElements();
outputAdElement.append(adsElementsArray[0]);
