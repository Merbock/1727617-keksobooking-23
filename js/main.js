const getRandomInteger = (min, max) => {
  if (min < 0 || min >= max || max < 0) {
    throw new RangeError('Введены некорректные параметры');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(1, 10);

const getRandomFloatNumber = (min, max, decimal = 2) => {
  if (min < 0 || min >= max || max < 0) {
    throw new RangeError('Введены некорректные параметры');
  }

  return + (Math.random() * (max - min) + min).toFixed(decimal);
};

getRandomFloatNumber(1, 10);

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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0,elements.length - 1)];

const getRandomArrayLength = (elements) => {
  const arrayLength = getRandomInteger(1, elements.length);
  const array = [];
  for (let index = 0; index <= arrayLength; index++) {
    array.push(elements[index]);
  }
  return array;
};

const createAdvert = () => {
  const latitude = getRandomFloatNumber(35.65, 35.70, 5);
  const longitude = getRandomFloatNumber(139.70, 139.80, 5);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 10)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomInteger(2000, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
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

const similarAdvert = new Array(10).fill(null).map(() => createAdvert());

similarAdvert;
