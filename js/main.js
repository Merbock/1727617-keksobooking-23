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
