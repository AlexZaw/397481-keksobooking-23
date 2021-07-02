import { formControl } from './form-control.js';
import { initAdFormValidation } from './ad-form-validation.js';
import { createMarkersGroup, initMap } from './map.js';
import { getData } from './api.js';
import { errorPopup, showPopup, successPopup, dataError } from './popup.js';
const { disableForms, enableAdForm, enableFilterForm, onAdFormSubmit } = formControl;

const similarAdsQuantity = 10;
const getSimilarAds = () => () => {
  getData((adsList) => {
    createMarkersGroup(adsList.slice(0, similarAdsQuantity));
  }, showPopup(dataError));
};

disableForms();

initMap()
  .then(getSimilarAds())
  .then(enableFilterForm)
  .catch(showPopup(dataError))
  .finally(() => {
    enableAdForm();
    initAdFormValidation();
    onAdFormSubmit(showPopup(successPopup),showPopup(errorPopup));
  });
