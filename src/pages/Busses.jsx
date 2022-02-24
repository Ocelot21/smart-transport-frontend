import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchAllBusses from "../axios/fetchAllBusses";
import fetchAllUsers from "../axios/fetchAllUsers";
import getMe from "../axios/getMe";
import "../global.css";
import Icon from "../bus.ico";

const Busses = () => {
  const navigate = useNavigate();
  const [busses, setBusses] = useState([]);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [busId, setBusId] = useState("");
  const [seats, setSeats] = useState("");
  const [route, setRoute] = useState("");
  const [driver, setDriver] = useState(null);

  const checkIfUserIsLoggedIn = async () => {
    const response = await getMe();
    if (!response.user) {
      navigate("/");
    }
    fetchUsers();
    fetchBusses();
  };
  const fetchUsers = async () => {
    const usersFetch = await fetchAllUsers();
    if (Array.isArray(usersFetch?.users)) {
      setUsers(usersFetch?.users);
    }
  };
  const fetchBusses = async () => {
    const usersFetch = await fetchAllBusses();
    if (Array.isArray(usersFetch?.busses)) {
      setBusses(usersFetch?.busses);
    }
  };
  const onChangeBusId = (e) => {
    if (e?.target?.value) {
      setBusId(e?.target?.value);
    }
  };
  const onChangeSeats = (e) => {
    if (e?.target?.value) {
      setSeats(e?.target?.value);
    }
  };
  const onChangeRoute = (e) => {
    if (e?.target?.value) {
      setRoute(e?.target?.value);
    }
  };
  const onChangeDriver = (e) => {
    if (e?.target?.value) {
      setDriver(e?.target?.value);
    }
  };

  const createANewBus = async () => {
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
    setBusId("");
    setSeats("");
    setRoute("");
    fetchBusses();
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <div>
      {busses.map((el) => {
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
            <div key={el._id} className='model'>
              <p>ID: {el._id}</p>
              <p>ID autobusa: {el.busId}</p>
              <p>ID vozača: {el.driver}</p>
              <p>Ruta: {el.route}</p>
              <p>Sjedišta: {el.seats}</p>
              <p>Zauzeto: {el.taken}</p>
              <p>
                Lokacija: {el.lat} | {el.lng}
              </p>
              <p>Stanje: {el.broken ? "U kvaru" : "Ispravan"}</p>
              <p>Posljednje ažuriranje: {el.updatedAt}</p>
              <button onClick={() => navigate(`/bus/${el._id}`)}>
                GO TO BUS PAGE
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={() => setOpenModal(true)}>Create new Bus</button>
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
            <select value={driver} onChange={onChangeDriver}>
              <option value={null}>No driver</option>
              {users.map((el) => {
                return (
                  <option key={el._id} value={el._id}>
                    {el.username}
                  </option>
                );
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
