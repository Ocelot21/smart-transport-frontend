import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getMe from "../axios/getMe";
import Icon from "../bus.ico";
const AdminPage = () => {
  const navigate = useNavigate();

  const checkIfUserIsLoggedIn = async () => {
    const response = await getMe();
    if (!response.user) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const onClickUsers = () => {
    navigate("/users");
  };

  const onClickBuses = () => {
    navigate("/busses");
  };

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
    </div>
  );
};

export default AdminPage;
