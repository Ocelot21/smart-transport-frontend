import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchUser from "../axios/fetchUser";

import getMe from "../axios/getMe";

import "../global.css";
import Icon from "../bus.ico";

const User = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState(null);

  const checkIfUserIsLoggedIn = async () => {
    const response = await getMe();
    if (!response.user) {
      navigate("/");
    }
    fetchUsers();
  };

  const fetchUsers = async () => {
    const usersFetch = await fetchUser(params.id);
    if (usersFetch?.user) {
      setUser(usersFetch?.user);
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
      {user && (
        <div className='model'>
          <p>ID: {user._id}</p>
          <p>Korisničko ime: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Uloga: {user.role}</p>
          <p>Posljednje ažuriranje: {user.updatedAt}</p>
        </div>
      )}
    </div>
  );
};

export default User;
