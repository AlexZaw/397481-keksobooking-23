const getRandomNumber = (min, max, decimalPlaces = 0) => {
  if (min < 0 || max < 0 || decimalPlaces < 0) {
    throw new RangeError('Передаваемые значения должны быть больше или равны нулю');
  }
  if (min >= max) {
    throw new Error('Минимальное значение не может быть больше или равно максимальному');
  }
  if (!min && min !==0 || !max && max !== 0) {
    throw new Error('Диапазон передаваемых значений не определен');
  }
  if (typeof (min) !== 'number' || typeof (max) !== 'number' || typeof (decimalPlaces) !== 'number') {
    throw new Error('Передаваемые значения должны быть числом');
  }
  let randomNumber = (min - 0.5) + Math.random() * (max - min + 1);
  if (decimalPlaces === 0) {
    randomNumber = Math.round(randomNumber);
  } else {
    if (randomNumber < min) {
      randomNumber += 0.5;
    }
    if (randomNumber > max) {
      randomNumber -= 0.5;
    }
    randomNumber = randomNumber.toFixed(decimalPlaces);
  }
  return +randomNumber;
};

getRandomNumber(1, 10);
getRandomNumber(0, 10, 5);
