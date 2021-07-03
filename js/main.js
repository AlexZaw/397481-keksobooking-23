import { formControl } from './form-control.js';
import { initAdFormValidation } from './ad-form-validation.js';
import { createMarkersGroup, initMap } from './map.js';
import { getData } from './api.js';
import { errorPopup, showPopup, successPopup, dataError } from './popup.js';
const { disableForms, enableAdForm, enableFilterForm, onAdFormSubmit } = formControl;

disableForms();

const SIMILAR_ADS_QUANTITY = 10;

const getSimilarAds = new Promise((onSucces) => {
  getData((adsList) => {
    createMarkersGroup(adsList.slice(0, SIMILAR_ADS_QUANTITY));
    onSucces();
  }, showPopup(dataError));
});

initMap()
  .then(() => {
    getSimilarAds
      .then(enableFilterForm);
  })
  .then(enableAdForm)
  .then(initAdFormValidation)
  .then(() => {onAdFormSubmit(showPopup(successPopup), showPopup(errorPopup));})
  .catch(showPopup(dataError));
