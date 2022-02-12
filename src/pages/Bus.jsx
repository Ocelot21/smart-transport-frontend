import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchBus from "../axios/fetchBus";
import getMe from "../axios/getMe";
import postBusLocation from "../axios/postBusLocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../index.css'

const Bus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [bus, setBus] = useState(null);

    const checkIfUserIsLoggedIn = async() => {
        const response = await getMe();
        if(!response.user){
            navigate('/');
        };
        fetchBusState();
    };

    const fetchBusState = async() => {
        const usersFetch = await fetchBus(params.id);
        if(usersFetch?.bus){
            setBus(usersFetch?.bus);
        }
    }

    const keepPostingLocation = () => {
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.watchPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                postBusLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, params.id);
                //Every 5 seconds repeat if on this page
                setTimeout(()=>{
                    if(location.pathname.includes('/bus/')) keepPostingLocation()
                },5000)
            });
          } else {
            console.log("Not Available");
          }
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    return (
        <div>
            {bus && (
                <div style={{
                    background: 'gray',
                    marginBottom: '10px'
                }}>
                    <p>id: {bus._id}</p>
                    <p>busId: {bus.busId}</p>
                    <p>driverId: {bus.driver}</p>
                    <p>route: {bus.route}</p>
                    <p>seats: {bus.seats}</p>
                    <p>taken: {bus.taken}</p>
                    <p>location: {bus.lat} | {bus.lng}</p>
                    <p>broken: {bus.broken ? 'True': 'False'}</p>
                    <p>updatedAt: {bus.updatedAt}</p>
                    <button onClick={keepPostingLocation}>Track my geo location</button>
                </div>
            )}
            {bus && (
                <MapContainer center={[bus.lat, bus.lng]} zoom={13}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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