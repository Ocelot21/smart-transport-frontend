import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchUser from "../axios/fetchUser";

import getMe from "../axios/getMe";

const User = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState(null);

    const checkIfUserIsLoggedIn = async() => {
        const response = await getMe();
        if(!response.user){
            navigate('/');
        };
        fetchUsers();
    };

    const fetchUsers = async() => {
        const usersFetch = await fetchUser(params.id);
        if(usersFetch?.user){
            setUser(usersFetch?.user);
        }
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    return (
        <div>
            {user && (
                <div style={{
                    background: 'gray',
                    marginBottom: '10px'
                }}>
                    <p>id: {user._id}</p>
                    <p>username: {user.username}</p>
                    <p>email: {user.email}</p>
                    <p>role: {user.role}</p>
                    <p>updatedAt: {user.updatedAt}</p>
                </div>
            )}
        </div>
    );
};

export default User;