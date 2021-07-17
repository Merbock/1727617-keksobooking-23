import {debounce} from './utils.js';
import {renderMarkers} from './map.js';

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

const ANY_SELECT = 'any';

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

const onCheckType = (ad) => housingType.value === ANY_SELECT || ad.offer.type === housingType.value;

const onCheckPrice = (ad) => {
  const filteredPrice = PriceValue[housingPrice.value];
  return housingPrice.value === ANY_SELECT || (ad.offer.price >= filteredPrice.MIN && ad.offer.price <= filteredPrice.MAX);
};

const onCheckRooms = (ad) => housingRooms.value === ANY_SELECT || ad.offer.rooms === Number(housingRooms.value);

const onCheckGuests = (ad) => housingGuests.value === ANY_SELECT || ad.offer.guests === Number(housingGuests.value);

const onCheckFeatures = (ad) => {
  const hasFeatures = Boolean(ad.offer.features);

  if (!hasFeatures) {
    return false;
  }

  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  return Array.from(checkedFeatures).every((checkbox) => ad.offer.features.includes(checkbox.value));
};

const filterOffers = (offers) => {
  const filteredOffers = [];
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    if (
      onCheckType(offer) && onCheckPrice(offer) && onCheckRooms(offer) && onCheckGuests(offer) && onCheckFeatures(offer)
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
