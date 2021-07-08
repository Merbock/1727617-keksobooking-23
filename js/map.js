import { createCard } from './card.js';
import { enablePage } from './page-state.js';

const DEFAULT_COORDS = {
  lat: 35.67500,
  lng: 139.75000,
};
const FRACTION_DIGITS = 5;

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView({
    lat: DEFAULT_COORDS.lat,
    lng: DEFAULT_COORDS.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainMarker = L.marker(
  {
    lat: DEFAULT_COORDS.lat,
    lng: DEFAULT_COORDS.lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

addressInput.value = `${mainMarker._latlng.lat.toFixed(FRACTION_DIGITS)}, ${mainMarker._latlng.lng.toFixed(FRACTION_DIGITS)}`;

mainMarker.on('move', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(FRACTION_DIGITS)}, ${evt.target.getLatLng().lng.toFixed(FRACTION_DIGITS)}`;
});

const resetMap = () => {
  map.setView(
    {
      lat: DEFAULT_COORDS.lat,
      lng: DEFAULT_COORDS.lng,
    }, 12);
  mainMarker.setLatLng({
    lat: DEFAULT_COORDS.lat,
    lng: DEFAULT_COORDS.lng,
  });
  addressInput.value = `${mainMarker._latlng.lat.toFixed(FRACTION_DIGITS)}, ${mainMarker._latlng.lng.toFixed(FRACTION_DIGITS)}`;
};

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const { location } = dataAd;

  const iconAd = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerAd = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: iconAd,
    },
    {
      keepInView: true,
    },
  );

  markerAd.addTo(markerGroup).bindPopup(createCard(dataAd));
};

export {createAdMarker, resetMap};
