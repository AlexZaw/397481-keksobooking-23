import { setAddress } from './form-control.js';
import { createAd } from './create-ads.js';
import { formValidation } from './ad-form-validation.js';
import { mapFilter } from './filters.js';
const { onDwellingChange } = formValidation;
let allAdsData = [];
const MapOption = {
  ZOOM: 13,
  DEFAULT_COORDS: {
    lat: 35.675,
    lng: 139.75,
  },
  TILE: {
    URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTR: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  MARKER: {
    ICON_PATH: './img/',
    MAIN:{
      ICON_NAME:'main-pin.svg',
      ICON_SIZE: [52, 52],
      ICON_ANCHOR: [26, 52],
    },
    DEFAULT:{
      ICON_NAME:'pin.svg',
      ICON_SIZE: [40, 40],
      ICON_ANCHOR: [20, 40],
    },
  },
};

const map = L.map('map-canvas');

const initMap = async () => {
  map.on('load', () => {
    setAddress(MapOption.DEFAULT_COORDS);
    onDwellingChange();
  })
    .setView(
      {
        lat: MapOption.DEFAULT_COORDS.lat,
        lng: MapOption.DEFAULT_COORDS.lng,
      }, MapOption.ZOOM);
};

L.tileLayer(
  MapOption.TILE.URL,
  {
    attribution: MapOption.TILE.ATTR,
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: `${MapOption.MARKER.ICON_PATH}${MapOption.MARKER.MAIN.ICON_NAME}`,
    iconSize: MapOption.MARKER.MAIN.ICON_SIZE,
    iconAnchor: MapOption.MARKER.MAIN.ICON_ANCHOR,
  });

const mainMarker = L.marker(
  {
    lat: MapOption.DEFAULT_COORDS.lat,
    lng: MapOption.DEFAULT_COORDS.lng,
  },
  {
    icon: mainMarkerIcon,
    draggable: true,
    autoPan: true,
  },
);
mainMarker.addTo(map);
mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (currentAd) => {
  const { lat, lng } = currentAd.location;
  const icon = L.icon(
    {
      iconUrl: `${MapOption.MARKER.ICON_PATH}${MapOption.MARKER.DEFAULT.ICON_NAME}`,
      iconSize: MapOption.MARKER.DEFAULT.ICON_SIZE,
      iconAnchor: MapOption.MARKER.DEFAULT.ICON_ANCHOR,
    },
  );
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker.addTo(markerGroup)
    .bindPopup(createAd(currentAd));
};

const createMarkersGroup = (similarAds) => {
  markerGroup.clearLayers();
  const filteredAds = mapFilter(similarAds);
  filteredAds.forEach((currentAd) => {
    createMarker(currentAd);
  });
};

const saveAdsData = (adsList) =>{
  allAdsData = adsList.slice();
};

const resetMap = () => {
  map.setView(
    {
      lat: MapOption.DEFAULT_COORDS.lat,
      lng: MapOption.DEFAULT_COORDS.lng,
    }, MapOption.ZOOM);
  mainMarker.setLatLng(
    [MapOption.DEFAULT_COORDS.lat,
      MapOption.DEFAULT_COORDS.lng,
    ]);
  setAddress(MapOption.DEFAULT_COORDS);
  createMarkersGroup(allAdsData);
};

export { initMap, resetMap, createMarkersGroup, saveAdsData};
