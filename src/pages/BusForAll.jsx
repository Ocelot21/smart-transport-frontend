import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchBus from "../axios/fetchBus";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../index.css";
import "../global.css";
import Icon from "../bus.ico";

const Bus = () => {
  const params = useParams();
  const [bus, setBus] = useState(null);

  const fetchBusState = async () => {
    const usersFetch = await fetchBus(params.id);
    if (usersFetch?.bus) {
      setBus(usersFetch?.bus);
    }
  };

  useEffect(() => {
    fetchBusState();
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li className='home'>
            <a href='/'>
              <img src={Icon} alt='SmartTransport' />
              SmartTransport
            </a>
          </li>
          <li>
            <a href='/login'>Prijava</a>
          </li>
        </ul>
      </nav>
      {bus && (
        <div className='model'>
          <p>ID: {bus.busId}</p>
          <p>Ruta: {bus.route}</p>
          <p>Broj sjedišta: {bus.seats}</p>
          <p>Zauzeta sjedišta: {bus.taken}</p>
          <p>Stanje autobusa: {bus.broken ? "U kvaru" : "Ispravan"}</p>
        </div>
      )}
      {bus && (
        <MapContainer center={[bus.lat, bus.lng]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[bus.lat, bus.lng]}>
            <Popup>
              Bus is here <br />
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Bus;
