import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { CEBU_CENTER } from '../../utils/constants';

const getLeafletHTML = (vehicles) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    #map { height: 100vh; width: 100vw; }
    .vehicle-label {
      background: white;
      border: 2px solid #F4A124;
      border-radius: 8px;
      padding: 2px 6px;
      font-size: 11px;
      font-weight: bold;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map', { zoomControl: true })
      .setView([${CEBU_CENTER.lat}, ${CEBU_CENTER.lng}], ${CEBU_CENTER.zoom});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    const vehicles = ${JSON.stringify(vehicles)};
    const markers = {};

    function getIcon(type) {
      return L.divIcon({
        html: type === 'jeep' ? '🚐' : '🚌',
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    }

    function renderVehicles(list) {
      list.forEach(v => {
        if (markers[v.id]) {
          markers[v.id].setLatLng([v.lat, v.lng]);
        } else {
          markers[v.id] = L.marker([v.lat, v.lng], { icon: getIcon(v.type) })
            .addTo(map)
            .bindPopup(
              '<b>' + v.type.toUpperCase() + '</b><br/>' +
              'Route: ' + v.route + '<br/>' +
              'ETA: ' + (v.eta || 'Calculating...')
            );
        }
      });
    }

    renderVehicles(vehicles);

    // Listen for location updates from React Native
    document.addEventListener('message', function(event) {
      try {
        const updated = JSON.parse(event.data);
        renderVehicles(updated);
      } catch(e) {}
    });
    window.addEventListener('message', function(event) {
      try {
        const updated = JSON.parse(event.data);
        renderVehicles(updated);
      } catch(e) {}
    });
  </script>
</body>
</html>
`;

export default function LeafletMap({ vehicles = [] }) {
  const webViewRef = useRef(null);

  // Push new vehicle data into the WebView without re-rendering
  const updateVehicles = (newVehicles) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify(newVehicles));
    }
  };

  // Expose updateVehicles via ref if parent needs it
  React.useImperativeHandle(null, () => ({ updateVehicles }));

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{ html: getLeafletHTML(vehicles) }}
      style={styles.map}
      scrollEnabled={false}
      javaScriptEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});