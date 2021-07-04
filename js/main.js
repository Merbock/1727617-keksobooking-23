import {similarAdverts} from './data.js';
import {createCard} from './card.js';
import {disablePage, enablePage} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const card = createCard(similarAdverts[4]);

mapCanvas.append(card);

//тест
window.addEventListener('DOMContentLoaded', () => {
  disablePage();
  document.addEventListener('click', enablePage);
});
