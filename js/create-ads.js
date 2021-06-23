import { createSimilarAds } from './create-similar-ads.js';

const typeOfDwelling = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const similarAdTemplate = document.querySelector('#card').content;
const similarAds = createSimilarAds();

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

const createPhotosFragment = (currentAdObj, photosList) => {
  const currentAdPhotos = currentAdObj.offer.photos || [];
  const adPhotosFragment = document.createDocumentFragment();
  const photoSample = photosList.querySelector('.popup__photo');
  photosList.textContent = '';
  currentAdPhotos.forEach((path) => {
    const photo = photoSample.cloneNode(true);
    photo.src = path;
    adPhotosFragment.append(photo);
  });

  return adPhotosFragment;
};

const isValue = (value, element) => value || element.remove();

const createAds = () => {
  const adsElements = similarAds.map((currentAdObj) => {
    const adElement = similarAdTemplate.cloneNode(true);
    const adPrice = adElement.querySelector('.popup__text--price');
    const adPriceInnerElement = adPrice.querySelector('span');
    const adDescription = adElement.querySelector('.popup__description ');
    const adTitle = adElement.querySelector('.popup__title');
    const adAddress = adElement.querySelector('.popup__text--address');
    const adFeatures = adElement.querySelector('.popup__features');
    const adPhotos = adElement.querySelector('.popup__photos');

    adTitle.textContent = isValue(currentAdObj.offer.title, adTitle);
    adAddress.textContent = isValue(currentAdObj.offer.address, adAddress);
    adPrice.textContent = `${isValue(currentAdObj.offer.price, adPrice)} `;
    adPrice.textContent ? adPrice.append(adPriceInnerElement) : false;

    adElement.querySelector('.popup__type ').textContent = typeOfDwelling[currentAdObj.offer.type];
    adElement.querySelector('.popup__text--capacity ').textContent =
      `${currentAdObj.offer.rooms} комнаты для ${currentAdObj.offer.guests} гостей`;
    adElement.querySelector('.popup__text--time ').textContent = `Заезд после
  ${currentAdObj.offer.checkin}, выезд до ${currentAdObj.offer.checkout}`;
    adDescription.textContent = isValue(currentAdObj.offer.description, adDescription);
    adElement.querySelector('.popup__avatar').src = currentAdObj.author.avatar;

    const adFeaturesFragment = createFeaturesFragment(currentAdObj, adFeatures);
    adFeaturesFragment.children.length ? adFeatures.append(adFeaturesFragment) : adFeatures.remove();

    const adPhotosFragment = createPhotosFragment(currentAdObj, adPhotos);
    adPhotosFragment.children.length ? adPhotos.append(adPhotosFragment) : adPhotos.remove();

    return adElement;
  });

  return adsElements;
};

export { createAds };
