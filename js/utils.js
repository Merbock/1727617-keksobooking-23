const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscEvent, debounce};
