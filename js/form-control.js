import { onDwellingChange } from './ad-form-validation.js';
import { sendData } from './api.js';
import { resetMap } from './map.js';
const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adAddress = adForm.address;
const resetFormButton = adForm.querySelector('.ad-form__reset');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const avatarPreviewDefault = avatarPreview.querySelector('img').cloneNode(true);
const phothoPreview = document.querySelector('.ad-form__photo');

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.setAttribute('disabled', ''));
  [...filterForm.elements].forEach((element) => element.setAttribute('disabled', ''));
};

const enableFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  [...filterForm.elements].forEach((element) => element.removeAttribute('disabled'));
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  [...adForm.elements].forEach((element) => element.removeAttribute('disabled'));
};

const setAddress = ({ lat, lng }) => {
  adAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const resetForms = () => {
  adForm.reset();
  phothoPreview.textContent ='';
  avatarPreview.textContent = '';
  avatarPreview.append(avatarPreviewDefault);
  filterForm.reset();
  onDwellingChange();
};

const onAdFormSubmit = (sendSuccess,sendFailed) =>{
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      sendSuccess,
      sendFailed,
      new FormData(evt.target));
  });
};

const formControl = {
  disableForms,
  enableAdForm,
  enableFilterForm,
  onAdFormSubmit,
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
  resetMap();
});


export { formControl, setAddress, resetForms };
