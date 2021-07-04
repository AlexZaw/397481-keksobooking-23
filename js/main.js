import { formControl } from './form-control.js';
import { initAdFormValidation } from './ad-form-validation.js';
import { createMarkersGroup, initMap} from './map.js';
import { getData } from './api.js';
import { errorPopup, showPopup, successPopup, dataError } from './popup.js';
import { setFilterFormChange } from './filters.js';
const { disableForms, enableAdForm, enableFilterForm, onAdFormSubmit } = formControl;

disableForms();

const getSimilarAds = new Promise((onSucces) => {
  getData((adsList) => {
    createMarkersGroup(adsList);
    setFilterFormChange(()=>createMarkersGroup(adsList));
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
