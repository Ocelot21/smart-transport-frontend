import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchAllBusses from "../axios/fetchAllBusses";

const Busses = () => {
    const navigate = useNavigate()
    const [busses, setBusses] = useState([]);
    const fetchBusses = async() => {
        const usersFetch = await fetchAllBusses();
        if(Array.isArray(usersFetch?.busses)){
            setBusses(usersFetch?.busses);
        }
    }

    useEffect(() => {
        fetchBusses();
    }, [])


    return (
        <div>
            {busses.map(el => {
                return (
                    <div key={el._id} style={{
                        background: 'gray',
                        marginBottom: '10px'
                    }}>
                        <p>id: {el._id}</p>
                        <p>busId: {el.busId}</p>
                        <p>driverId: {el.driver}</p>
                        <p>route: {el.route}</p>
                        <p>seats: {el.seats}</p>
                        <p>taken: {el.taken}</p>
                        <p>location: {el.lat} | {el.lng}</p>
                        <p>broken: {el.broken ? 'True': 'False'}</p>
                        <p>updatedAt: {el.updatedAt}</p>
                        <button onClick={() => navigate(`/bus-for-all/${el._id}`)}>GO TO BUS PAGE</button>
                    </div>
                )
            })}
        </div>
    );
};

export default Busses;