const successPopup = document.querySelector('#success').content
  .querySelector('.success');

const errorPopup = document.querySelector('#error').content
  .querySelector('.error');

const dataError = document.querySelector('#data-error').content
  .querySelector('.data-error');

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onClosePopup =(evt) =>{
  const popup = document.querySelector('.active-popup');
  if (isEscKey(evt) || evt.type === 'click') {
    popup.remove();
  }
  document.removeEventListener('keydown', onClosePopup);
};

const closePopupListener = (popup) => {
  document.addEventListener('keydown', onClosePopup);
  popup.addEventListener('click', onClosePopup);
};

const showPopup = (popupSample) => () => {
  const popupClone = popupSample.cloneNode(true);
  popupClone.classList.add('active-popup');
  document.body.insertAdjacentElement('beforeend', popupClone);
  closePopupListener(popupClone);
};

export { successPopup, errorPopup, dataError, showPopup };
