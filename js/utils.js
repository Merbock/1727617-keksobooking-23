const getRandomInteger = (min, max) => {
  if (min < 0 || min >= max || max < 0) {
    throw new RangeError('Введены некорректные параметры');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (min, max, decimal = 2) => {
  if (min < 0 || min >= max || max < 0) {
    throw new RangeError('Введены некорректные параметры');
  }

  return + (Math.random() * (max - min) + min).toFixed(decimal);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0,elements.length - 1)];

const getRandomArrayLength = (elements) => {
  const arrayLength = getRandomInteger(1, elements.length - 1);
  const array = [];

  for (let index = 0; index <= arrayLength; index++) {
    array.push(elements[index]);
  }

  return array;
};

export {getRandomInteger, getRandomFloatNumber, getRandomArrayElement, getRandomArrayLength};
