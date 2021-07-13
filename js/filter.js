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

const checkIsControlInterrelation = (controlValue, checker) => {
  const isInterrelation = controlValue || checker;
  return isInterrelation;
};

const validationTypeToFunction = {
  checkType(ad) {
    return checkIsControlInterrelation (housingType.value === ANY_SELECT, ad.offer.type === housingType.value);
  },
  checkPrice(ad) {
    const filteredPrice = PriceValue[housingPrice.value];
    return housingPrice.value === ANY_SELECT || (ad.offer.price >= filteredPrice.MIN && ad.offer.price <= filteredPrice.MAX);
  },
  checkRooms(ad) {
    return housingRooms.value === ANY_SELECT || ad.offer.rooms === Number(housingRooms.value);
  },
  checkGuests(ad) {
    return housingGuests.value === ANY_SELECT || ad.offer.guests === Number(housingGuests.value);
  },
  checkFeatures(ad) {
    const hasFeatures = Boolean(ad.offer.features);
    if (!hasFeatures) {
      return false;
    }
    const checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every((checkbox) => ad.offer.features.includes(checkbox.value));
  },
};

const getFilteredOffers = (offers) => {
  const filteredOffers = offers.filter((offerData) => {
    const isSuitable = Object.keys(validationTypeToFunction).every((key) => {
      const currentValidation = validationTypeToFunction[key];

      return currentValidation(offerData);
    });

    return isSuitable;
  });

  return filteredOffers;
};

export {getFilteredOffers, filterForm};
