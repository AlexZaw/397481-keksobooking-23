const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const disablePage = () =>{
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.setAttribute('disabled',''));
  [...filterForm.elements].forEach((element) => element.setAttribute('disabled',''));
};

const enablePage = () =>{
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.removeAttribute('disabled'));
  [...filterForm.elements].forEach((element) => element.removeAttribute('disabled'));
};

disablePage();
export { enablePage };
