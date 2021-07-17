const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.setAttribute('disabled', ''));
  [...mapFilter.elements].forEach((element) => element.setAttribute('disabled', ''));
};

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  [...adForm.elements].forEach((element) => element.removeAttribute('disabled', ''));
  [...mapFilter.elements].forEach((element) => element.removeAttribute('disabled', ''));
};

disablePage();

export {enablePage};
