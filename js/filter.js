import {debounce} from './utils.js';
import {renderMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

const ANY_SELECT = 'any';
const FILTERED_ARR = 10;

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

const CheckType = ({offer}) => housingType.value === ANY_SELECT || offer.type === housingType.value;

const CheckPrice = ({offer}) => {
  const filteredPrice = PriceValue[housingPrice.value];
  return housingPrice.value === ANY_SELECT || (offer.price >= filteredPrice.MIN && offer.price <= filteredPrice.MAX);
};

const CheckRooms = ({offer}) => housingRooms.value === ANY_SELECT || offer.rooms === Number(housingRooms.value);

const CheckGuests = ({offer}) => housingGuests.value === ANY_SELECT || offer.guests === Number(housingGuests.value);

const CheckFeatures = ({offer}) => {
  const hasFeatures = Boolean(offer.features);

  if (!hasFeatures) {
    return false;
  }

  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  return Array.from(checkedFeatures).every((checkbox) => offer.features.includes(checkbox.value));
};

const filterOffers = (offers) => {
  const filteredOffers = [];
  for (let i = 0; i < offers.length && filteredOffers.length < FILTERED_ARR; i++) {
    const offer = offers[i];
    if (
      CheckType(offer) &&
      CheckPrice(offer) &&
      CheckRooms(offer) &&
      CheckGuests(offer) &&
      CheckFeatures(offer)
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
