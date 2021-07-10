const template = document.querySelector('#card').content.querySelector('.popup');

const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getDeclension = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => (
  txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
);

const fillFeatures = (cardPopup, features) => {
  const featureList = cardPopup.querySelector('.popup__features');

  featureList.innerHTML = '';

  features.forEach((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    featureList.appendChild(newFeature);
  });
};

const fillPhoto = (cardPopup, photos) => {
  const photoList = cardPopup.querySelector('.popup__photos');

  photoList.innerHTML = '';

  photos.forEach((src) => {
    photoList.insertAdjacentHTML(
      'beforeend',
      `<img src=${src} class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });
};

const createCard = ({author, offer}) => {
  const {
    title,
    address,
    price,
    type,
    description,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    photos,
  } = offer;

  const cardPopup = template.cloneNode(true);
  const popupAvatar = cardPopup.querySelector('.popup__avatar');
  const popupTitle = cardPopup.querySelector('.popup__title');
  const popupAddress = cardPopup.querySelector('.popup__text--address');
  const popupPrice = cardPopup.querySelector('.popup__text--price');
  const popupType = cardPopup.querySelector('.popup__type');
  const popupDescription = cardPopup.querySelector('.popup__description');
  const popupCapacity = cardPopup.querySelector('.popup__text--capacity');
  const popupTime = cardPopup.querySelector('.popup__text--time');

  popupAvatar.src = (!author.avatar) ? popupAvatar.remove() : author.avatar;
  popupTitle.textContent = (!title) ? popupTitle.remove() : title;
  popupAddress.textContent = (!address) ? popupAddress.remove() : address;
  popupPrice.textContent = (!price) ? popupPrice.remove() : `${price} ₽/ночь`;
  popupType.textContent = (!type) ? popupType.remove() : housingType[type];
  popupDescription.textContent = (!description) ? popupDescription.remove() : description;
  popupCapacity.textContent = (!rooms || !guests) ? popupCapacity.remove() : `${rooms} ${getDeclension(`${rooms}`, ['комната', 'комнаты', 'комнат'])} для ${guests} ${getDeclension(`${guests}`, ['гостя', 'гостей', 'гостей'])}`;
  popupTime.textContent = (!checkin || !checkout) ? popupTime.remove() : `Заезд после ${checkin}, выезд после ${checkout}`;
  fillFeatures(cardPopup, features);
  fillPhoto(cardPopup, photos);

  return cardPopup;
};

// const createCard = (ad) => {
//   const cardPopup = template.cloneNode(true);
//   const popupAvatar = cardPopup.querySelector('.popup__avatar');
//   const popupTitle = cardPopup.querySelector('.popup__title');
//   const popupAddress = cardPopup.querySelector('.popup__text--address');
//   const popupPrice = cardPopup.querySelector('.popup__text--price');
//   const popupType = cardPopup.querySelector('.popup__type');
//   const popupDescription = cardPopup.querySelector('.popup__description');
//   const popupCapacity = cardPopup.querySelector('.popup__text--capacity');
//   const popupTime = cardPopup.querySelector('.popup__text--time');

//   popupAvatar.src = (!ad.author.avatar) ? popupAvatar.remove() : ad.author.avatar;
//   popupTitle.textContent = (!ad.offer.title) ? popupTitle.remove() : ad.offer.title;
//   popupAddress.textContent = (!ad.offer.address) ? popupAddress.remove() : ad.offer.address;
//   popupPrice.textContent = (!ad.offer.price) ? popupPrice.remove() : `${ad.offer.price} ₽/ночь`;
//   popupType.textContent = (!ad.offer.type) ? popupType.remove() : housingType[ad.offer.type];
//   popupDescription.textContent = (!ad.offer.description) ? popupDescription.remove() : ad.offer.description;
//   popupCapacity.textContent = (!ad.offer.rooms || !ad.offer.guests) ? popupCapacity.remove() : `${ad.offer.rooms} ${getDeclension(`${ad.offer.rooms}`, ['комната', 'комнаты', 'комнат'])} для ${ad.offer.guests} ${getDeclension(`${ad.offer.guests}`, ['гостя', 'гостей', 'гостей'])}`;
//   popupTime.textContent = (!ad.offer.checkin || !ad.offer.checkout) ? popupTime.remove() : `Заезд после ${ad.offer.checkin}, выезд после ${ad.offer.checkout}`;
//   // fillFeatures(cardPopup, features);
//   // fillPhoto(cardPopup, photos);

//   return cardPopup;
// };

export {createCard};
