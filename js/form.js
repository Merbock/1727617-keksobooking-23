const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const formTitle = adForm.querySelector('#title');
const formPrice = adForm.querySelector('#price');
const formRooms = adForm.querySelector('#room_number');
const formCapacity = adForm.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 100;

const toggleElements = (form, flag) => {
  [...form.elements].forEach((element) => element.disabled = flag);
};

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  toggleElements(adForm, true);
  toggleElements(mapFilter, true);
};

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  toggleElements(adForm, false);
  toggleElements(mapFilter, false);
};
// Валидация заголовка
formTitle.addEventListener('input', () => {
  const formTitleLength = formTitle.value.length;

  if (formTitleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - formTitleLength} симв.`);
  } else if (formTitleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${formTitleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
});
// Валидация цены
formPrice.addEventListener('input', () => {
  if (formPrice.value > MAX_PRICE_VALUE) {
    formPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб`);
  }
  else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity();
});
//синхронизация кол-ва комнат и мест
const checkNumRooms = () => {
  const roomsValue = +formRooms.value;
  const guestsValue = +formCapacity.value;

  if (roomsValue < guestsValue) {
    formCapacity.setCustomValidity('Выберите меньшее количество гостевых мест');
  } else if (roomsValue !== MAX_ROOM_NUMBER && guestsValue === 0) {
    formCapacity.setCustomValidity('Выберите количество гостевых мест');
  } else if (roomsValue === MAX_ROOM_NUMBER && guestsValue !== 0) {
    formCapacity.setCustomValidity('Не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }

  formCapacity.reportValidity();
};

formCapacity.addEventListener('change', checkNumRooms);

export {disablePage, enablePage};
