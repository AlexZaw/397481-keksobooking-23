const getRandomNumber = (min, max, decimalPlaces = 0) => {
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
