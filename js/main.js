const getRndInteger = function (min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (min < 0 || min >= max || max < 0) {
    return ('Введены некорректные параметры');
  }

  return randomNumber;
};

getRndInteger(1, 10);

const getRndNumber = function (min, max, decimal) {
  const randomNumber = + (Math.random() * (max - min) + min).toFixed(decimal);

  if (min < 0 || min >= max || max < 0) {
    return ('Введены некорректные параметры');
  }

  return randomNumber;
};

getRndNumber(1, 10, 2);
