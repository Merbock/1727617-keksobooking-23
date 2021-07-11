import {isEscEvent} from './utils.js';

const SHOW_TIME = 5000;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const onDeleteMessageClick = (evt) => {
  const message = document.querySelector('.displayMessage');

  if (evt.type === 'click') {
    evt.preventDefault();
    message.remove();
    document.removeEventListener('click', onDeleteMessageClick);
  }
};

const onDeleteMessageKey = (evt) => {
  const message = document.querySelector('.displayMessage');

  if (isEscEvent(evt)) {
    evt.preventDefault();
    message.remove();
    document.removeEventListener('keydown', onDeleteMessageKey);
  }
};

const showMessageSendSuccess = () => {
  const messageElement = successMessage.cloneNode(true);
  messageElement.classList.add('displayMessage');
  document.body.append(messageElement);

  messageElement.addEventListener('keydown', onDeleteMessageKey);
  messageElement.addEventListener('click', onDeleteMessageClick);
};

const showMessageSendError = (error) => {
  const messageElement = errorMessage.cloneNode(true);
  const errorMessageText = messageElement.querySelector('.error__message');
  messageElement.classList.add('displayMessage');
  document.body.append(messageElement);

  if (error) {
    errorMessageText.textContent += ': Что-то пошло не так, попробуйте обновить страницу';
  }

  messageElement.addEventListener('keydown', onDeleteMessageKey);
  messageElement.addEventListener('click', onDeleteMessageClick);
};

const showMessageGetError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export {showMessageGetError, showMessageSendSuccess, showMessageSendError};
