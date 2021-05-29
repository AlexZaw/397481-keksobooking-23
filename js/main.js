const getRandomNumber = (min, max, decimalPlaces = 0) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  return +( Math.min(min, max) + Math.random() * Math.abs(max - min) ).toFixed(Math.abs(decimalPlaces));
};

getRandomNumber(0, -10);
getRandomNumber(0, -10, -3);
