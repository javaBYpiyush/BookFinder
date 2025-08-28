import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function BookMap({ books }) {
  // For demonstration, randomize coordinates for each book
  const markers = books.map((b, i) => ({
    ...b,
    lat: 20 + Math.random() * 10,
    lng: 70 + Math.random() * 10,
  }));

  return (
    <MapContainer
      center={[25, 75]}
      zoom={4}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {markers.map((b) => (
        <Marker key={b.key} position={[b.lat, b.lng]}>
          <Popup>
            <strong>{b.title}</strong>
            <br />
            {b.author_name?.join(", ")}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
