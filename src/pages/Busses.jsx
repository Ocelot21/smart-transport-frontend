import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchAllBusses from "../axios/fetchAllBusses";
import fetchAllUsers from "../axios/fetchAllUsers";
import getMe from "../axios/getMe";

const Busses = () => {
    const navigate = useNavigate()
    const [busses, setBusses] = useState([]);
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [busId, setBusId] = useState('');
    const [seats, setSeats] = useState('');
    const [route, setRoute] = useState('');
    const [driver, setDriver] = useState(null);

    const checkIfUserIsLoggedIn = async() => {
        const response = await getMe();
        if(!response.user){
            navigate('/');
        };
        fetchUsers();
        fetchBusses();
    };
    const fetchUsers = async() => {
        const usersFetch = await fetchAllUsers();
        if(Array.isArray(usersFetch?.users)){
            setUsers(usersFetch?.users);
        }
    }
    const fetchBusses = async() => {
        const usersFetch = await fetchAllBusses();
        if(Array.isArray(usersFetch?.busses)){
            setBusses(usersFetch?.busses);
        }
    }
    const onChangeBusId = (e) => {
        if(e?.target?.value){
            setBusId(e?.target?.value);
        }
    };
    const onChangeSeats = (e) => {
        if(e?.target?.value){
            setSeats(e?.target?.value);
        }
    };
    const onChangeRoute = (e) => {
        if(e?.target?.value){
            setRoute(e?.target?.value);
        }
    };
    const onChangeDriver = (e) => {
        if(e?.target?.value){
            setDriver(e?.target?.value);
        }
    };

    const createANewBus = async() => {
        await createANewBus({
            busId,
            seats,
            route,
            driver,
            taken: 0,
            lat: 0,
            lng: 0,
            broken: false,
        });
        setOpenModal(false);  
        setBusId('');
        setSeats('');
        setRoute('');    
        fetchBusses();
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
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
                        <button onClick={() => navigate(`/bus/${el._id}`)}>GO TO BUS PAGE</button>
                    </div>
                )
            })}
            <button onClick={()=> setOpenModal(true)}>Create new Bus</button>
            {openModal && (
                <div>
                    Hello
                    <div>
                        <p>BusId</p>
                        <input onChange={onChangeBusId} value={busId}></input>
                    </div>
                    <div>
                        <p>Seats</p>
                        <input onChange={onChangeSeats} value={seats}></input>
                    </div>
                    <div>
                        <p>Route</p>
                        <input onChange={onChangeRoute} value={route}></input>
                    </div>
                    <div>
                        <p>Driver</p>
                        <select 
                            value={driver} 
                            onChange={onChangeDriver} 
                        >
                            <option  value={null}>No driver</option>
                            {users.map(el => {
                                return(
                                    <option key={el._id} value={el._id}>{el.username}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button onClick={createANewBus}>Create</button>
                </div>
            )}
        </div>
    );
};

export default Busses;