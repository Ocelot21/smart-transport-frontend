import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getMe from "../axios/getMe";

const AdminPage = () => {
    const navigate = useNavigate()

    const checkIfUserIsLoggedIn = async() => {
        const response = await getMe();
        if(!response.user){
            navigate('/');
        }
    };

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    const onClickUsers = () => {
        navigate('/users');
    }

    const onClickBuses = () => {
        navigate('/busses');
    }

    return (
        <div>
            <button onClick={onClickUsers}>USERS LIST</button>
            <button onClick={onClickBuses}>BUS LIST</button>
        </div>
    );
};

export default AdminPage;