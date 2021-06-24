import { enableForm, setAddress } from './form-control.js';
import { createAd } from './create-ads.js';

const DEFAULT_COORDS = {
  lat: 35.675,
  lng: 139.75,
};

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    setAddress(DEFAULT_COORDS);
  })
  .setView(
    {
      ...DEFAULT_COORDS,
    }, 13);

L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

const mainMarker = L.marker(
  {
    ...DEFAULT_COORDS,
  },
  {
    icon: mainMarkerIcon,
    draggable: true,
    autoPan: true,
  },
);

mainMarker.addTo(map);
mainMarker.on('dragend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (currentAd) => {
  const { lat, lng } = currentAd.location;
  const icon = L.icon(
    {
      iconUrl: '../img/pin.svg',
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

export { createMarkersGroup };
