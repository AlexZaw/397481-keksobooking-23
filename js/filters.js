import { debounce } from './utils.js';

const filterForm = document.querySelector('.map__filters');
const featuresInput = filterForm.querySelectorAll('[type="checkbox"]');
const SIMILAR_ADS_QUANTITY = 10;
const ANY_RANGE = 'any';
const PRICE_RANGE = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: Infinity,
  },
};

const featuresFilter = (adsArray) => {
  const selectedFeatures = [...featuresInput].filter((input) => input.checked);
  const filtered = adsArray.slice()
    .filter((currentAd) =>
      selectedFeatures.every((feature) =>
        currentAd.offer.features && currentAd.offer.features.includes(feature.value)));
  return filtered;
};

const adFilter = (adsArray) => {
  const filtersValue = {
    type: filterForm['housing-type'].value,
    price: filterForm['housing-price'].value.toUpperCase(),
    rooms: Number(filterForm['housing-rooms'].value) ||
      filterForm['housing-rooms'].value.toLowerCase(),
    guests: Number(filterForm['housing-guests'].value) ||
      filterForm['housing-guests'].value.toLowerCase(),
  };
  const filterKeys = Object.keys(filtersValue);
  const filteredAds = adsArray.slice()
    .filter((currentAd) => filterKeys.every((key) => {
      if (key === 'price') {
        if (Object.prototype.hasOwnProperty.call(PRICE_RANGE, filtersValue[key])) {
          const min = PRICE_RANGE[filtersValue[key]].MIN;
          const max = PRICE_RANGE[filtersValue[key]].MAX;
          return (currentAd.offer[key] >= min && currentAd.offer[key] <= max);
        }
        return true;
      }
      return currentAd.offer[key] === filtersValue[key] || filtersValue[key] === ANY_RANGE;
    }));
  return filteredAds;
};

const mapFilter =(data) =>{
  const similarAds = data.slice();
  const filteredFeatures = featuresFilter(similarAds);
  const filteredAds = adFilter(filteredFeatures)
    .slice(0, SIMILAR_ADS_QUANTITY);
  return filteredAds;
};

const setFilterFormChange = (cb) => {
  filterForm.addEventListener('change', debounce(cb));
};

export {mapFilter, setFilterFormChange };
