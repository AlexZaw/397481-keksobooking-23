const getRandomNumber = (min, max, decimalPlaces = 0) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  let randomNumber;

  if (decimalPlaces !== 0) {
    randomNumber = (Math.min(min, max) + Math.random() * Math.abs(max - min)).toFixed(Math.abs(decimalPlaces));
  } else {
    randomNumber = Math.floor(Math.min(min, max) + Math.random() * (Math.abs(max - min) + 1));
  }
  return +randomNumber;
};

getRandomNumber(0, -10);
getRandomNumber(0, -10, -3);
