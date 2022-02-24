import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchBus from "../axios/fetchBus";
import getMe from "../axios/getMe";
import postBusLocation from "../axios/postBusLocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../index.css";
import "../global.css";
import Icon from "../bus.ico";

const Bus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [bus, setBus] = useState(null);

  const checkIfUserIsLoggedIn = async () => {
    const response = await getMe();
    if (!response.user) {
      navigate("/");
    }
    fetchBusState();
  };

  const fetchBusState = async () => {
    const usersFetch = await fetchBus(params.id);
    if (usersFetch?.bus) {
      setBus(usersFetch?.bus);
    }
  };

  const keepPostingLocation = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        postBusLocation(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          params.id
        );
        //Every 5 seconds repeat if on this page
        setTimeout(() => {
          if (location.pathname.includes("/bus/")) keepPostingLocation();
        }, 5000);
      });
    } else {
      console.log("Not Available");
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
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
            <a href='/users'>Lista korisnika</a>
          </li>
          <li>
            <a href='/busses'>Lista autobusa</a>
          </li>
        </ul>
      </nav>
      {bus && (
        <div className='model'>
          <p>ID: {bus._id}</p>
          <p>ID autobusa: {bus.busId}</p>
          <p>ID vozača: {bus.driver}</p>
          <p>Ruta: {bus.route}</p>
          <p>Sjedišta: {bus.seats}</p>
          <p>Zauzeto: {bus.taken}</p>
          <p>
            Lokacija: {bus.lat} | {bus.lng}
          </p>
          <p>Stanje: {bus.broken ? "U kvaru" : "Ispravan"}</p>
          <p>Posljednje ažuriranje: {bus.updatedAt}</p>
          <button onClick={keepPostingLocation}>Pošalji lokaciju</button>
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
