import { setAddress } from './form-control.js';
import { createAd } from './create-ads.js';
import { onDwellingChange } from './ad-form-validation.js';

const MapOption = {
  DEFAULT_COORDS: {
    lat: 35.675,
    lng: 139.75,
  },
  TILE: {
    URL: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
    ATTR: `&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>,
    &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy;
    <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`,
  },
  MARKER: {
    ICON_PATH: './img/',
    MAIN_IMG: 'main-pin.svg',
    DEFAULT_IMG: 'pin.svg',
  },
};
const map = L.map('map-canvas');

const initMap = async () => {
  // return Promise.reject();
  map.on('load', () => {
    setAddress(MapOption.DEFAULT_COORDS);
    onDwellingChange();
  })
    .setView(
      {
        lat: MapOption.DEFAULT_COORDS.lat,
        lng: MapOption.DEFAULT_COORDS.lng,
      }, 13);
};

L.tileLayer(
  MapOption.TILE.URL,
  {
    attribution: MapOption.TILE.ATTR,
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: `${MapOption.MARKER.ICON_PATH}${MapOption.MARKER.MAIN_IMG}`,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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

const resetMap = () => {
  map.setView(
    {
      lat: MapOption.DEFAULT_COORDS.lat,
      lng: MapOption.DEFAULT_COORDS.lng,
    }, 13);
  mainMarker.setLatLng(
    [MapOption.DEFAULT_COORDS.lat,
      MapOption.DEFAULT_COORDS.lng,
    ]);
  setAddress(MapOption.DEFAULT_COORDS);
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (currentAd) => {
  const { lat, lng } = currentAd.location;
  const icon = L.icon(
    {
      iconUrl: `${MapOption.MARKER.ICON_PATH}${MapOption.MARKER.DEFAULT_IMG}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
  similarAds.forEach((currentAd) => {
    createMarker(currentAd);
  });
};
export { initMap, resetMap, createMarkersGroup };
