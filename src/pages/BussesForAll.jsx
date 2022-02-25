import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchAllBusses from "../axios/fetchAllBusses";

import "../global.css";
import Icon from "../bus.ico";

const Busses = () => {
  const navigate = useNavigate();
  const [busses, setBusses] = useState([]);
  const fetchBusses = async () => {
    const usersFetch = await fetchAllBusses();
    if (Array.isArray(usersFetch?.busses)) {
      setBusses(usersFetch?.busses);
    }
  };

  useEffect(() => {
    fetchBusses();
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
      {busses.map((el) => {
        return (
          <div>
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
              <button onClick={() => navigate(`/bus-for-all/${el._id}`)}>
                GO TO BUS PAGE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Busses;
