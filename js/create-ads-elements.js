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

const fillFeatures = (currentAdObj, adElement) => {
  const currentAdFeaturesArray = currentAdObj.offer.features || [];
  const featuresListElement = adElement.querySelector('.popup__features');
  const adFeaturesFragment = document.createDocumentFragment();

  currentAdFeaturesArray.forEach((feature) => {
    const modifier = `--${feature}`;
    const presentFeature = featuresListElement.querySelector(`[class$=${modifier}`);
    adFeaturesFragment.append(presentFeature);
  });

  adFeaturesFragment.children.length
    ? (featuresListElement.textContent = '', featuresListElement.append(adFeaturesFragment))
    : featuresListElement.remove();
};

const fillPhotos = (currentAdObj, adElement) => {
  const currentAdPhotosArray = currentAdObj.offer.photos || [];
  const photosListElement = adElement.querySelector('.popup__photos');
  const photoSample = photosListElement.querySelector('.popup__photo');
  photosListElement.textContent = '';
  currentAdPhotosArray.forEach((path) => {
    const photo = photoSample.cloneNode(true);
    photo.src = path;
    photosListElement.append(photo);
  });

  !(photosListElement.children.length)
    ? photosListElement.remove()
    : false;
};

const isValue = (value, element) => value ? value : element.remove();

const createAdsElements = () => {
  const adsElements = similarAds.map((currentAdObj) => {
    const adElement = similarAdTemplate.cloneNode(true);
    const adPrice = adElement.querySelector('.popup__text--price');
    const adPriceInnerElement = adPrice.querySelector('span');
    const adDescription = adElement.querySelector('.popup__description ');
    const adTitle = adElement.querySelector('.popup__title');
    const adAddress = adElement.querySelector('.popup__text--address');

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

    fillPhotos(currentAdObj, adElement);
    fillFeatures(currentAdObj, adElement);

    return adElement;
  });

  return adsElements;
};

export { createAdsElements };
