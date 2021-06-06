const OffersOptions = {
  USERS: {
    MAX: 10,
    HAS_AVATARS: 8,
  },
  TITLES: [
    'Огромный дворец',
    'Маленькая уютная квартира',
    'Красивый дом',
    'Уютное бунгало',
    'Уютный номер',
  ],
  PRICE: {
    MIN: 1,
    MAX: 100000,
  },
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  ROOMS: {
    MIN: 1,
    MAX: 10,
  },
  GUESTS: {
    MIN: 1,
    MAX: 15,
  },
  CHECKIN: [
    '12:00',
    '13:00',
    '14:00',
  ],
  CHECKOUT: [
    '12:00',
    '13:00',
    '14:00',
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.',
  ],
  LOCATION: {
    LATITUDE: {
      MIN: 35.65,
      MAX: 35.7,
    },
    LONGITUDE: {
      MIN: 139.7,
      MAX: 139.8,
    },
    PRECISSION: 5,
  },
};

const AvatarsOption = {
  AVATARS_PATH: '../img/avatars/',
};

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
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomObjectMinMax = (obj) => getRandomNumber(obj.MIN, obj.MAX);

const shuffleArray = (array) => {
  const tempArray = array.slice();
  for (let i = 0; i < tempArray.length; i++) {
    const random = getRandomNumber(0, tempArray.length - 1);
    [tempArray[i], tempArray[random]] = [tempArray[random], tempArray[i]];
  }

  return tempArray;
};

const cropArray = (array) => array.slice(0, getRandomNumber(1, array.length));

const getAvatar = (index) => {
  const imagePath = AvatarsOption.AVATARS_PATH;
  const imagePartName = (index <= OffersOptions.USERS.HAS_AVATARS) ?
    'user' :
    'default';
  const prefix = '0';
  let imageFullName;
  if (index <= OffersOptions.USERS.HAS_AVATARS) {
    imageFullName = index < 10 ?
      imagePath + imagePartName + prefix + index :
      imagePath + imagePartName + index;
  } else {
    imageFullName = imagePath + imagePartName;
  }

  return {
    avatar: `${imageFullName}.png`,
  };
};

const getFeatures = (array) => cropArray(shuffleArray(array));

const getLocation = () => ({ lat: getRandomNumber(OffersOptions.LOCATION.LATITUDE.MIN, OffersOptions.LOCATION.LATITUDE.MAX, OffersOptions.LOCATION.PRECISSION), lng: getRandomNumber(OffersOptions.LOCATION.LONGITUDE.MIN, OffersOptions.LOCATION.LONGITUDE.MAX, OffersOptions.LOCATION.PRECISSION) });

const createAd = (index) => {
  const adObj = {
    author: getAvatar(index),
    offer: {
      title : getRandomArrayElement(OffersOptions.TITLES),
      price : getRandomObjectMinMax(OffersOptions.PRICE),
      type : getRandomArrayElement(OffersOptions.TYPES),
      rooms : getRandomObjectMinMax(OffersOptions.ROOMS),
      guests : getRandomObjectMinMax(OffersOptions.GUESTS),
      checkin : getRandomArrayElement(OffersOptions.CHECKIN),
      checkout : getRandomArrayElement(OffersOptions.CHECKOUT),
      features : getFeatures(OffersOptions.FEATURES),
      photos : cropArray(OffersOptions.PHOTOS),
    },
    location: getLocation(),
  };

  adObj.offer.desciption = adObj.offer.title;
  adObj.offer.address = `${adObj.location.lat}, ${adObj.location.lng}`;

  return adObj;
};

const similarAds = new Array(OffersOptions.USERS.MAX).fill(null).map((element, index) => createAd(index));

similarAds;

getRandomNumber(1, 10);
getRandomNumber(0, 10, 5);

