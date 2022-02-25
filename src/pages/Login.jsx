import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import loginToBackend from "../axios/login";
import { setTokenToStorage } from "../axios/axios";
import getMe from "../axios/getMe";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e?.target?.value);
  };

  const onChangePassword = (e) => {
    setPassowrd(e?.target?.value);
  };

  const onClickLogin = async () => {
    const response = await loginToBackend({ username, password });
    const token = response?.token;
    if (token) {
      setTokenToStorage(token);
      navigate("/admin-page");
    }
  };

  const checkIfUserIsLoggedIn = async () => {
    const response = await getMe();
    if (response.user) {
      navigate("/admin-page");
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <div className='login'>
      <div>
        <p>Username</p>
        <input onChange={onChangeUsername} value={username}></input>
      </div>
      <div>
        <p>Password</p>
        <input
          type='password'
          onChange={onChangePassword}
          value={password}
        ></input>
      </div>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
};

export default Login;
