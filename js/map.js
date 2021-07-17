import {createCard} from './card.js';
import {enablePage} from './page-state.js';
import {setAddress} from './form.js';
import {getData} from './api.js';
import {showMessageGetError} from './messages.js';
import {filterOffers, setFilterListener} from './filter.js';

const addressInput = document.querySelector('#address');
const FRACTION_DIGITS = 5;
const MAP_ZOOM = 12;

const DefaultCoords = {
  LAT: 35.67500,
  LNG: 139.75000,
};

const Tile = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRUBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const Marker = {
  MAIN_ICON_HEIGHT: 52,
  MAIN_ICON_WIDTH: 52,
  MAIN_ANCHOR_Y: 52,
  AD_ICON_HEIGHT: 40,
  AD_ICON_WIDTH: 40,
  AD_ANCHOR_Y: 40,
};

const map = L.map('map-canvas');

const mainIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [Marker.MAIN_ICON_WIDTH, Marker.MAIN_ICON_HEIGHT],
    iconAnchor: [Marker.MAIN_ICON_WIDTH / 2, Marker.MAIN_ANCHOR_Y],
  },
);

const mainMarker = L.marker(
  {
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const {location} = dataAd;

  const iconAd = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [Marker.AD_ICON_WIDTH, Marker.AD_ICON_HEIGHT],
    iconAnchor: [Marker.AD_ICON_WIDTH / 2, Marker.AD_ANCHOR_Y],
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

const renderMarkers = (ads) => {
  markerGroup.clearLayers();
  const filteredAds = filterOffers(ads);
  filteredAds.forEach((dataAd) => {
    createAdMarker(dataAd);
  });
};

map
  .on('load', () => {
    enablePage();
    getData(
      (ads) => {
        renderMarkers(ads);
        setFilterListener(ads);
      },
      showMessageGetError,
    );
    addressInput.value = `${DefaultCoords.LAT.toFixed(FRACTION_DIGITS)}, ${DefaultCoords.LNG.toFixed(FRACTION_DIGITS)}`;
  })
  .setView({
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  }, MAP_ZOOM);

L.tileLayer(
  Tile.URL,
  {
    attribtuion: Tile.ATTRUBUTION,
  },
).addTo(map);

const resetMap = () => {
  map.setView(
    {
      lat: DefaultCoords.LAT,
      lng: DefaultCoords.LNG,
    });
  mainMarker.setLatLng({
    lat: DefaultCoords.LAT,
    lng: DefaultCoords.LNG,
  });
  getData((ads) => renderMarkers(ads));
};

export {renderMarkers, resetMap};
