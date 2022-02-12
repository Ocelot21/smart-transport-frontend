import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchBus from "../axios/fetchBus";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../index.css'

const Bus = () => {
    const params = useParams();
    const [bus, setBus] = useState(null);

    const fetchBusState = async() => {
        const usersFetch = await fetchBus(params.id);
        if(usersFetch?.bus){
            setBus(usersFetch?.bus);
        }
    }

    useEffect(() => {
        fetchBusState();
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