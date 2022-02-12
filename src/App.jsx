
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from './pages/Users';
import StartPage from './pages/Login';
import BussesForAll from './pages/BussesForAll';
import AdminPage from './pages/AdminPage'
import Busses from './pages/Busses';
import User from './pages/User';
import Bus from './pages/Bus';
import BusForAll from './pages/BusForAll';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<StartPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/busses" element={<Busses />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/bus/:id" element={<Bus />} />
        <Route path="/bus-for-all/:id" element={<BusForAll />} />
        <Route path="/" element={<BussesForAll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
