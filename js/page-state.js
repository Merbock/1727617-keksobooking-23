const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const toggleElements = (form, flag) => {
  [...form.elements].forEach((element) => element.disabled = flag);
};

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  toggleElements(adForm, true);
  toggleElements(mapFilter, true);
};

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  toggleElements(adForm, false);
  toggleElements(mapFilter, false);
};

disablePage();

export {enablePage};
