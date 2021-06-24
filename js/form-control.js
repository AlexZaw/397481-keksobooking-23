const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adAddress = adForm.address;

const disableForm = () =>{
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.setAttribute('disabled',''));
  [...filterForm.elements].forEach((element) => element.setAttribute('disabled',''));
};

const enableForm = () =>{
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.removeAttribute('disabled'));
  [...filterForm.elements].forEach((element) => element.removeAttribute('disabled'));
};

const setAddress = ({lat, lng}) => {
  adAddress.value = `${Number(lat.toFixed(5))}, ${Number(lng.toFixed(5))}`;
};

disableForm();

export { enableForm, setAddress };
