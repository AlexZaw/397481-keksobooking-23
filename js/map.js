import { setAddress } from './form-control.js';
import { createAd } from './create-ads.js';
import { onDwellingChange } from './ad-form-validation.js';
import { mapFilter } from './filters.js';

const MapOption = {
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
    MAIN_IMG: 'main-pin.svg',
    DEFAULT_IMG: 'pin.svg',
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
  markerGroup.clearLayers();
  const filteredAds = mapFilter(similarAds);
  filteredAds.forEach((currentAd) => {
    createMarker(currentAd);
  });
};

export { initMap, resetMap, createMarkersGroup};

