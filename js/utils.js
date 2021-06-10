const getRandomNumber = (min, max, decimalPlaces = 0) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = decimalPlaces
    ? (Math.random() * (upper - lower) + lower).toFixed(decimalPlaces)
    : Math.floor(Math.random() * (upper - lower + 1) + lower);

  return Number(result);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const shuffleArray = (array) => {
  const tempArray = array.slice();
  for (let i = 0; i < tempArray.length; i++) {
    const random = getRandomNumber(0, tempArray.length - 1);
    [tempArray[i], tempArray[random]] = [tempArray[random], tempArray[i]];
  }

  return tempArray;
};

const cropArray = (array) => array.slice(0, getRandomNumber(1, array.length));

export {getRandomNumber, getRandomArrayElement, shuffleArray, cropArray};
