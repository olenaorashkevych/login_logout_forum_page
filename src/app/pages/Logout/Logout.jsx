import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

export default function Logout() {
    const { setuser } = useContext(UserContext);

    setuser(null);
    localStorage.removeItem("token");
    const naigation = useNavigate();
    naigation("/");
    return;
}