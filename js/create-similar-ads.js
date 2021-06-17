import { getRandomNumber, getRandomArrayElement, shuffleArray, cropArray } from './utils.js';

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
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
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

  return `${imageFullName}.png`;
};

const getFeatures = (array) => cropArray(shuffleArray(array));

const getLocation = (latLng) => {
  const axis = latLng.toUpperCase();
  return getRandomNumber(OfferOption.LOCATION[axis].MIN,
    OfferOption.LOCATION[axis].MAX,
    OfferOption.LOCATION.PRECISSION);
};

const createAd = () => {
  const location = {
    lat: getLocation('latitude'),
    lng: getLocation('longitude'),
  };
  const adObj = {
    author: {
      avatar: getAvatar(),
    },
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
      description: getRandomArrayElement(OfferOption.DESCRIPTIONS),
      photos: cropArray(OfferOption.PHOTOS),
    },
    location,
  };

  return adObj;
};
const createSimilarAds = (adCount = OfferOption.USER.MAX) => new Array(adCount).fill(null).map(createAd);

export { createSimilarAds };
