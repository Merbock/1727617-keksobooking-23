import {similarAdverts} from './data.js';
import {createCard} from './card.js';

const mapCanvas = document.querySelector('#map-canvas');

const card = createCard(similarAdverts[4]);

mapCanvas.append(card);
