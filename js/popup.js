import { isEscKey } from './utils.js';

const successPopup = document.querySelector('#success').content
  .querySelector('.success');

const errorPopup = document.querySelector('#error').content
  .querySelector('.error');

const dataError = document.querySelector('#data-error').content
  .querySelector('.data-error');

const onPopupClick = (popup) => () => {
  popup.remove();
};

const onPopupEscKeydown = (popup) => (evt) => {
  if (isEscKey(evt)) {
    popup.remove();
  }
};

const closePopupListener = (popup) => {
  const closePopup = popup;
  document.addEventListener('keydown', onPopupEscKeydown(closePopup), { once: true });
  closePopup.addEventListener('click', onPopupClick(closePopup));
};

const showPopup = (popupSample) => () => {
  const popupClone = popupSample.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', popupClone);
  closePopupListener(popupClone);
};

export { successPopup, errorPopup, dataError, showPopup };
