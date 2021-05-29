const getRandomNumber = (min, max, decimalPlaces = 0) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  return +(Math.abs( Math.min(min, max) - 0.5 + Math.random() * Math.abs(max - min + 1) ) ).toFixed(Math.abs(decimalPlaces) );
};

getRandomNumber(0, -10);
getRandomNumber(0, -10, -3);
