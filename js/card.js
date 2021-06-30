import {similarAdverts} from './data.js';

const template = document.querySelector('#card').content.querySelector('.popup'); //находим шаблон и его содержимое
const mapCanvas = document.querySelector('#map-canvas'); // находим блок с картой

const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardFragment = document.createDocumentFragment(); // создаем фрагмент

const createCard = ({author, offer}) => {
  const cardPopup = template.cloneNode(true); // клонируем элемент со всем содержимым
  // Находим нужные элементы в шаблоне
  const popupAvatar = cardPopup.querySelector('.popup__avatar');
  const popupTitle = cardPopup.querySelector('.popup__title');
  const popupAddress = cardPopup.querySelector('.popup__text--address');
  const popupPrice = cardPopup.querySelector('.popup__text--price');
  const popupType = cardPopup.querySelector('.popup__type');
  const popupDescription = cardPopup.querySelector('.popup__description');
  const popupCapacity = cardPopup.querySelector('.popup__text--capacity');
  const popupTime = cardPopup.querySelector('.popup__text--time');

  popupAvatar.src = (!author.avatar) ? popupAvatar.remove() : author.avatar;
  popupTitle.textContent = (!offer.title) ? popupTitle.remove() : offer.title;
  popupAddress.textContent = (!offer.address) ? popupAddress.remove() : offer.address;
  popupPrice.textContent = (!offer.price) ? popupPrice.remove() : `${offer.price} ₽/ночь`;
  popupType.textContent = (!offer.type) ? popupType.remove() : housingType[offer.type];
  popupDescription.textContent = (!offer.description) ? popupDescription.remove() : offer.description;
  // Создаем генератор соответствия комнат
  const getDeclensionRooms = function (rooms) {
    if (rooms > 4) {
      return 'комнат';
    } else if (rooms > 1) {
      return 'комнаты';
    } else {
      return 'комната';
    }
  };
  // Создаем генератор соответствия гостей
  const getDeclensionGuests = function (guests) {
    return guests === 1 ? 'гостя' : 'гостей';
  };

  popupCapacity.textContent = (!offer.rooms || !offer.guests) ? popupCapacity.remove() : `${offer.rooms} ${getDeclensionRooms(offer.rooms)} для ${offer.guests} ${getDeclensionGuests(offer.guests)}`;
  popupTime.textContent = (!offer.checkin || !offer.checkout) ? popupTime.remove() : `Заезд после ${offer.checkin}, выезд после ${offer.checkout}`;

  const featureElements = cardPopup.querySelector('.popup__features'); // Находим список фич
  // Добавляем проверку на наличие объекта с фичами
  if (!offer.features) {
    featureElements.remove(); // Удаляем список с фичами
  } else {
    const featureElement = cardPopup.querySelectorAll('.popup__feature'); // Находим элементы списка с фичами
    const modifiers = (offer.features).map((feature) => `popup__feature--${feature}`); // Итерируемся по массиву фич и возвращаем класс с модификатором
    featureElement.forEach((item) => {
      const modifire = item.classList[1]; // Проверяем наличие второго класса(модификатора) у элемента фич
      if (!modifiers.includes(modifire)) {
        item.remove(); // Если у элемента нет второго класса(модификатора), то удаляем элемент
      }
    });
  }

  const photoList = cardPopup.querySelector('.popup__photos'); // Находим блок с фото
  if (!offer.photos) {
    photoList.remove(); // Проверяем наличие в массиве объекта с фото, если нет, то удаляем блок
  } else {
    photoList.querySelector('.popup__photo').remove(); // Если объект с фото есть, то очищаем блок с фото
  }
  // Проходимся по массиву фото и добавляем элементы в конец блока в виде шаблонной строки
  offer.photos.forEach((address) => {
    photoList.insertAdjacentHTML('beforeend', `<img src = "${address}" class = "popup__photo" width = "45" heigth = "40" alt = "Фотография жилья">`);
  });

  cardFragment.appendChild(cardPopup); // Добавляем в фрагмент шаблон с данными

  mapCanvas.appendChild(cardFragment); // Отрисовываем фрагмент с данными в mapCanvas
};

createCard(similarAdverts[4]);

export {createCard};
