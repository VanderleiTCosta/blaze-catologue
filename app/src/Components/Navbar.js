import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function NavbarComponent({setNavSelected}) {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };
    return (

        <Navbar>
            <img onClick={() => { setNavSelected(1) }} className="shot-logo" alt="logo shot company" src="shot-logo2.png" />
            <img className="exit-icon" alt="exit icon" src="exit-icon.png" onClick={handleLogoutClick} />
        </Navbar>
    )
}


const Navbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 1px solid red;
    overflow: hidden;
    max-height: 120px;
    align-items: center;
    // background: linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1));
    @media(max-width: 1500px){
        padding: 10px;
        justify-content: center;

    }

    .shot-logo{
        width: 200px;
        transform: scale(1.2);
        cursor: pointer;

        @media(max-width: 1500px){
            width: 150px;
        }
    }

    .exit-icon{
        width: 45px;
        cursor: pointer;
        opacity: 1;


        @media(max-width: 1500px){
            width: 40px;
        }
    }
`;