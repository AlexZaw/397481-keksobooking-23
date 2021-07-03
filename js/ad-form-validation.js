const roomsQuantityToCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const minRentPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const adTitle = adForm.title;
const adPrice = adForm.price;
const adDwellingType = adForm.type;
const adRoomQuantity = adForm.rooms;
const adCapacity = adForm.capacity;
const minAdTitleLength = adTitle.getAttribute('minlength');
const maxAdTitleLength = adTitle.getAttribute('maxlength');
const adTimeIn = adForm.timein;
const adTimeOut = adForm.timeout;

const maxAdPrice = Number(adPrice.getAttribute('max'));

const setEmptyFieldErrorMessage = (field) => {
  if (field.validity.valueMissing) {
    field.setCustomValidity('Заполните обязательное поле.');
  }
};

const markInvalidFormFields = (evt) => {
  const field = evt.target;
  field.classList.add('invalid-field');
  setEmptyFieldErrorMessage(field);
};

const unMarkInvalidFormFields = () => {
  const fields = adForm.elements;
  [...fields].forEach((field) => {
    if (field.checkValidity()) {
      field.classList.remove('invalid-field');
    }
  });
};

const onTitleChange = () => {
  const valueLength = adTitle.value.length;
  if (valueLength < minAdTitleLength) {
    adTitle.setCustomValidity(`Введите еще ${minAdTitleLength - valueLength}
    симв.`);
  } else if (valueLength > maxAdTitleLength) {
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - maxAdTitleLength}
    симв.`);
  } else {
    adTitle.setCustomValidity('');
  }
  adTitle.reportValidity() && unMarkInvalidFormFields();
};

const onPriceChange = () => {
  const minAdPrice = Number(adPrice.getAttribute('min'));
  const currentPrice = Number(adPrice.value);
  if (currentPrice > maxAdPrice) {
    adPrice.setCustomValidity(`Цена должна быть меньше ${maxAdPrice.toLocaleString()}`);
  } else if (currentPrice < minAdPrice) {
    adPrice.setCustomValidity(`Цена должна быть больше ${minAdPrice.toLocaleString()}`);
  }
  else {
    adPrice.setCustomValidity('');
  }
  adPrice.reportValidity() && unMarkInvalidFormFields();
};

const onDwellingChange = () => {
  adPrice.placeholder = minRentPrice[adDwellingType.value];
  adPrice.min = minRentPrice[adDwellingType.value];
};

const onCapacityChange = (evt) => {
  const roomsQuantity = Number(adRoomQuantity.value);
  const capacity = Number(adCapacity.value);
  if (!roomsQuantityToCapacity[roomsQuantity].includes(capacity)) {
    evt.preventDefault();
    adCapacity.setCustomValidity('Выберите верное количество гостей или комнат');
  } else {
    adCapacity.setCustomValidity('');
  }
  adCapacity.reportValidity() && unMarkInvalidFormFields();
};

const onTimeChage = (evt) => {
  if(evt.target === adTimeIn){
    adTimeOut.value = adTimeIn.value;
  }
  if(evt.target === adTimeOut){
    adTimeIn.value = adTimeOut.value;
  }
};

const initAdFormValidation = () => {
  adForm.addEventListener('invalid', markInvalidFormFields, true);
  adTitle.addEventListener('input', onTitleChange);
  adPrice.addEventListener('input', onPriceChange);
  adDwellingType.addEventListener('change', onDwellingChange);
  adCapacity.addEventListener('change', onCapacityChange);
  adRoomQuantity.addEventListener('change', onCapacityChange);
  adTimeIn.addEventListener('change', onTimeChage);
  adTimeOut.addEventListener('change', onTimeChage);

  adForm.addEventListener('submit', onCapacityChange, { once: true });
};

export { initAdFormValidation, onDwellingChange };
