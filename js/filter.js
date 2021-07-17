import {debounce} from './utils.js';
import {renderMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

const ANY_SELECT = 'any';
const SIMILAR_AD_COUNT = 10;

const PriceValue = {
  'any': {
    MIN: 0,
    MAX: Infinity,
  },
  'middle': {
    MIN: 10000,
    MAX: 50000,
  },
  'low': {
    MIN: 0,
    MAX: 10000,
  },
  'high': {
    MIN: 50000,
    MAX: Infinity,
  },
};

const checkType = ({offer}) => housingType.value === ANY_SELECT || offer.type === housingType.value;

const checkPrice = ({offer}) => {
  const filteredPrice = PriceValue[housingPrice.value];
  return housingPrice.value === ANY_SELECT || (offer.price >= filteredPrice.MIN && offer.price <= filteredPrice.MAX);
};

const checkRooms = ({offer}) => housingRooms.value === ANY_SELECT || offer.rooms === Number(housingRooms.value);

const checkGuests = ({offer}) => housingGuests.value === ANY_SELECT || offer.guests === Number(housingGuests.value);

const checkFeatures = ({offer}) => {
  if (!offer.features) {
    return false;
  }

  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  return Array.from(checkedFeatures).every((checkbox) => offer.features.includes(checkbox.value));
};

const filterOffers = (offers) => {
  const filteredOffers = [];
  for (let i = 0; i < offers.length && filteredOffers.length < SIMILAR_AD_COUNT; i++) {
    const offer = offers[i];
    if (
      checkType(offer) &&
      checkPrice(offer) &&
      checkRooms(offer) &&
      checkGuests(offer) &&
      checkFeatures(offer)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const setFilterListener = (data) => {
  filterForm.addEventListener(
    'change',
    debounce(() => {
      renderMarkers(data);
    }),
  );
};

const resetFilters = () => {
  filterForm.reset();
};

export {filterOffers, setFilterListener, resetFilters};
