const getRandomIntNumber = (min, max) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  if(max < min){
    const swap = max;
    max = min;
    min = swap;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomFloatNumber = (min, max, decimalPlaces) => {
  min = min < 0 ? Math.abs(min) : min;
  max = max < 0 ? Math.abs(max) : max;
  if(max < min){
    const swap = max;
    max = min;
    min = swap;
  }
  return +(min + Math.random() * (max - min)).toFixed(Math.abs(decimalPlaces));
};


getRandomIntNumber(0, -10);
getRandomFloatNumber(0, -10, -3);
