import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige los íconos de Leaflet al empaquetar con Vite.
// Sin esto, los marcadores no se muestran.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Zonas de cobertura de YUNCAR en Bogotá.
// Coordenadas aproximadas: ajústalas si quieres mayor precisión
// (clic derecho sobre el punto en Google Maps -> copiar lat, lng).
const ZONAS = [
  { nombre: "Puente Aranda", lat: 4.6097, lng: -74.114 },
  { nombre: "Fontibón", lat: 4.6783, lng: -74.143 },
  { nombre: "Álamos", lat: 4.706, lng: -74.101 },
  { nombre: "Montevideo", lat: 4.663, lng: -74.118 },
  { nombre: "Zona Franca", lat: 4.692, lng: -74.151 },
];

export default function CoverageMap() {
  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[4.66, -74.12]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ZONAS.map((zona) => (
          <Marker key={zona.nombre} position={[zona.lat, zona.lng]}>
            <Popup>Zona de cobertura — {zona.nombre}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
