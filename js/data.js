import{getRandomInteger, getRandomFloatNumber, getRandomArrayElement, getRandomArrayLength} from './utils.js';

const MIN_PRICE = 2000;
const MAX_PRICE = 10000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;
const MIN_LAT = 35.65;
const MAX_LAT = 35.70;
const MIN_LONG = 139.70;
const MAX_LONG = 139.80;
const FRACTION_DIGITS = 5;
const SIMILAR_ADVERTS_COUNT = 10;

const TITLES = [
  'Заголовок_1',
  'Заголовок_2',
  'Заголовок_3',
  'Заголовок_4',
  'Заголовок_5',
  'Заголовок_6',
  'Заголовок_7',
  'Заголовок_8',
  'Заголовок_9',
  'Заголовок_10',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Описание помещения_1',
  'Описание помещения_2',
  'Описание помещения_3',
  'Описание помещения_4',
  'Описание помещения_5',
  'Описание помещения_6',
  'Описание помещения_7',
  'Описание помещения_8',
  'Описание помещения_9',
  'Описание помещения_10',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAdvert = (index) => {
  const latitude = getRandomFloatNumber(MIN_LAT, MAX_LAT, FRACTION_DIGITS);
  const longitude = getRandomFloatNumber(MIN_LONG, MAX_LONG, FRACTION_DIGITS);

  return {
    author: {
      avatar: `img/avatars/user0${index}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayLength(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

// eslint-disable-next-line no-unused-vars
const similarAdverts = new Array(SIMILAR_ADVERTS_COUNT).fill(null).map((_, index) => createAdvert(index));

export{similarAdverts};
