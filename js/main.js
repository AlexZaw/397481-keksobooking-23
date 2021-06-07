const OfferOption = {
  USER: {
    MAX: 10,
    HAS_AVATAR: 8,
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
  ROOM: {
    MIN: 1,
    MAX: 10,
  },
  GUEST: {
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
  DESCRIPTIONS: [
    ' Уютная, милая, светлая комната, в которой каждая мелочь подобрана под твой любимый цвет, форму или материал.',
    'Тот уголок, где, казалось бы, ты мог находиться целую вечность.',
    'Коричневатый паркет и  мягкий белоснежный коврик, просторный диван серого цвета, рабочий стол небольших размеров',
    'Пол - фиолетовый, с разными узорами, стены лиловые, а потолок - розовый, с которого свисает люстра в виде трёх цветов.',
    'Крошечная клетушка, шагов в шесть длиной, имеет самый жалкий вид',
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

const avatarsIdArray = new Array(OfferOption.USER.MAX).fill(null).map((element, index) => index + 1);
const avatarsIdArrayShuffle = shuffleArray(avatarsIdArray);

const getAvatar = () => {
  const imagePath = AvatarsOption.AVATARS_PATH;
  const id = avatarsIdArrayShuffle.pop();
  const imagePartName = (id <= OfferOption.USER.HAS_AVATAR)
    ? 'user'
    : 'default';

  const imageFullName = (id <= OfferOption.USER.HAS_AVATAR)
    ? imagePath + imagePartName + `${id}`.padStart(2, '0')
    : imagePath + imagePartName;

  return {
    avatar: `${imageFullName}.png`,
  };
};

const getFeatures = (array) => cropArray(shuffleArray(array));

const getLocation = () => ({
  lat: getRandomNumber(OfferOption.LOCATION.LATITUDE.MIN,
    OfferOption.LOCATION.LATITUDE.MAX,
    OfferOption.LOCATION.PRECISSION),
  lng: getRandomNumber(OfferOption.LOCATION.LONGITUDE.MIN,
    OfferOption.LOCATION.LONGITUDE.MAX,
    OfferOption.LOCATION.PRECISSION),
});

const createAd = () => {
  const location = getLocation();
  const adObj = {
    author: getAvatar(),
    offer: {
      title: getRandomArrayElement(OfferOption.TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(OfferOption.PRICE.MIN, OfferOption.PRICE.MAX),
      type: getRandomArrayElement(OfferOption.TYPES),
      rooms: getRandomNumber(OfferOption.ROOM.MIN, OfferOption.ROOM.MAX),
      guests: getRandomNumber(OfferOption.GUEST.MIN, OfferOption.GUEST.MAX),
      checkin: getRandomArrayElement(OfferOption.CHECKIN),
      checkout: getRandomArrayElement(OfferOption.CHECKOUT),
      features: getFeatures(OfferOption.FEATURES),
      description : getRandomArrayElement(OfferOption.DESCRIPTIONS),
      photos: cropArray(OfferOption.PHOTOS),
    },
    location,
  };

  return adObj;
};

const similarAds = new Array(OfferOption.USER.MAX).fill(null).map(createAd);

similarAds;
getRandomNumber(0, 10, 5);
