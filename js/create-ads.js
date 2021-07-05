const typeOfDwelling = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const defaultAvatar = './img/avatars/default.png';
const similarAdTemplate = document.querySelector('#card').content
  .querySelector('.popup');

const createFeaturesFragment = (currentAdObj, featuresList) => {
  const adFeatures = currentAdObj.offer.features || [];
  const adFeaturesFragment = document.createDocumentFragment();
  adFeatures.forEach((feature) => {
    const modifier = `--${feature}`;
    const presentFeature = featuresList.querySelector(`[class$=${modifier}]`);
    adFeaturesFragment.append(presentFeature);
  });
  featuresList.textContent = '';

  return adFeaturesFragment;
};

const createPhotosList = (currentAdObj, photosList) => {
  const currentAdPhotos = currentAdObj.offer.photos || [];
  const photoSample = photosList.querySelector('.popup__photo');
  photosList.textContent = '';
  currentAdPhotos.forEach((path) => {
    const photo = photoSample.cloneNode(true);
    photo.src = path;
    photosList.append(photo);
  });

  return photosList;
};
const isValue = (value, element) => value || element.remove();

const createAd = (currentAdObj) => {
  const adElement = similarAdTemplate.cloneNode(true);
  const adPrice = adElement.querySelector('.popup__text--price');
  const adPriceInnerElement = adPrice.querySelector('span');
  const adDescription = adElement.querySelector('.popup__description');
  const adTitle = adElement.querySelector('.popup__title');
  const adAddress = adElement.querySelector('.popup__text--address');
  const adFeatures = adElement.querySelector('.popup__features');
  const adPhotos = adElement.querySelector('.popup__photos');
  const adDwellingType = adElement.querySelector('.popup__type ');
  const adCapacity = adElement.querySelector('.popup__text--capacity');
  const adTime = adElement.querySelector('.popup__text--time');
  const adAvatar = adElement.querySelector('.popup__avatar');

  adTitle.textContent = isValue(currentAdObj.offer.title, adTitle);
  adAddress.textContent = isValue(currentAdObj.offer.address, adAddress);
  adDwellingType.textContent = typeOfDwelling[currentAdObj.offer.type];
  adDescription.textContent = isValue(currentAdObj.offer.description, adDescription);
  adAvatar.src = currentAdObj.author.avatar || defaultAvatar;

  adPrice.textContent = `${isValue(currentAdObj.offer.price, adPrice)} `;
  if (adPrice.textContent) {
    adPrice.append(adPriceInnerElement);
  }

  adCapacity.textContent =
    `${currentAdObj.offer.rooms} комнаты для ${currentAdObj.offer.guests} гостей`;

  adTime.textContent =
    `Заезд после ${currentAdObj.offer.checkin}, выезд до ${currentAdObj.offer.checkout}`;


  const adFeaturesFragment = createFeaturesFragment(currentAdObj, adFeatures);
  if (adFeaturesFragment.children.length) {
    adFeatures.append(adFeaturesFragment);
  } else {
    adFeatures.remove();
  }

  const adPhotosList = createPhotosList(currentAdObj, adPhotos);
  if (adPhotosList.children.length) {
    adElement.replaceChild(adPhotosList, adPhotos);
  } else {
    adPhotos.remove();
  }

  return adElement;
};

export { createAd };
