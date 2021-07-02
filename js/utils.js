const ALERT_SHOW_TIME = 5000;
const showAlert = (state, message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = state ? 'green' : 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const recieveFailed = () => showAlert(
  false, 'Не удалось получить данные. Попробуйте обновить страницу');

export {recieveFailed, isEscKey };
