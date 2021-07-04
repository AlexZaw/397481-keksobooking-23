import { resetForms } from './form-control.js';
import { resetMap } from './map.js';
const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSucces, onFail) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки');
    })
    .then(onSucces)
    .catch(onFail);
};

const sendData = (onSucces, onFail, body) => {
  fetch(`${SERVER_URL}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSucces();
        resetForms();
        resetMap();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getData, sendData};
