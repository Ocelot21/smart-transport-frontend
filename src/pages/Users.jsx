import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createNewDriver from "../axios/createNewDriver";
import fetchAllUsers from "../axios/fetchAllUsers";

import getMe from "../axios/getMe";

const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');

    const checkIfUserIsLoggedIn = async() => {
        const response = await getMe();
        if(!response.user){
            navigate('/');
        };
        fetchUsers();
    };
    const fetchUsers = async() => {
        const usersFetch = await fetchAllUsers();
        if(Array.isArray(usersFetch?.users)){
            setUsers(usersFetch?.users);
        }
    }
    const onChangeUsername = (e) => {
        if(e?.target?.value){
            setUsername(e?.target?.value);
        }
    };

    const onChangePassword = (e) => {
        if(e?.target?.value){
            setPassowrd(e?.target?.value);
        }
    };

    const onChangeEmail = (e) => {
        if(e?.target?.value){
            setEmail(e?.target?.value);
        }
    };

    const createANewDriver = async() => {
        await createNewDriver({
            username,
            email,
            password
        });
        setOpenModal(false);  
        setUsername('');
        setEmail('');
        setPassowrd('');    
        fetchUsers();
    }

    useEffect(() => {
        checkIfUserIsLoggedIn();
    }, [])

    return (
        <div>
            {users.map(el => {
                return (
                    <div key={el._id} style={{
                        background: 'gray',
                        marginBottom: '10px'
                    }}>
                        <p>id: {el._id}</p>
                        <p>username: {el.username}</p>
                        <p>email: {el.email}</p>
                        <p>role: {el.role}</p>
                        <p>updatedAt: {el.updatedAt}</p>
                        <button onClick={() => navigate(`/user/${el._id}`)}>GO TO USER PAGE</button>
                    </div>
                )
            })}
            <button onClick={()=> setOpenModal(true)}>Create new user</button>
            {openModal && (
                <div>
                    <div>
                        <p>Username</p>
                        <input onChange={onChangeUsername} value={username}></input>
                    </div>
                    <div>
                        <p>Email</p>
                        <input onChange={onChangeEmail} value={email}></input>
                    </div>
                    <div>
                        <p>Password</p>
                        <input onChange={onChangePassword} value={password}></input>
                    </div>
                    <button onClick={createANewDriver}>Create</button>
                </div>
            )}
        </div>
    );
};

export default Users;