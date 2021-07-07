const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
const formPrice = adForm.querySelector('#price');
const formRooms = adForm.querySelector('#room_number');
const formCapacity = adForm.querySelector('#capacity');
const propertyTypes = adForm.querySelector('#type');
const checkInTime = adForm.querySelector('#timein');
const checkOutTime = adForm.querySelector('#timeout');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 100;
const MIN_GUESTS_VALUE = 0;
const PROPERTY_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const onTitleChange = () => {
  const formTitleLength = formTitle.value.length;

  if (formTitleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Введите ещё ${MIN_TITLE_LENGTH - formTitleLength} симв.`);
  } else if (formTitleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${formTitleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
};

const onPriceChange = () => {
  if (formPrice.value > MAX_PRICE_VALUE) {
    formPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE_VALUE} руб`);
  } else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity();
};

const onCapacityChange = () => {
  const roomsValue = +formRooms.value;
  const guestsValue = +formCapacity.value;

  if (roomsValue < guestsValue) {
    formCapacity.setCustomValidity('Выберите меньшее количество гостевых мест');
  } else if (roomsValue !== MAX_ROOM_NUMBER && guestsValue === MIN_GUESTS_VALUE) {
    formCapacity.setCustomValidity('Выберите количество гостевых мест');
  } else if (roomsValue === MAX_ROOM_NUMBER && guestsValue !== MIN_GUESTS_VALUE) {
    formCapacity.setCustomValidity('Не для гостей');
  } else {
    formCapacity.setCustomValidity('');
  }

  formCapacity.reportValidity();
};

const onPropertyChange = () => {
  formPrice.placeholder = PROPERTY_PRICE[propertyTypes.value];
  formPrice.min = PROPERTY_PRICE[propertyTypes.value];

  propertyTypes.reportValidity();
};

const onCheckInTime = () => {
  checkOutTime.value = checkInTime.value;

  checkInTime.reportValidity();
};

const onCheckOutTime = () => {
  checkInTime.value = checkOutTime.value;

  checkOutTime.reportValidity();
};

const setFormListeners = () => {
  formTitle.addEventListener('change', onTitleChange);
  formPrice.addEventListener('change', onPriceChange);
  formCapacity.addEventListener('change', onCapacityChange);
  propertyTypes.addEventListener('change', onPropertyChange);
  checkInTime.addEventListener('change', onCheckInTime);
  checkOutTime.addEventListener('change', onCheckOutTime);
};

export {setFormListeners};
