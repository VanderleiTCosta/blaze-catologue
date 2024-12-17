import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

export default function FourthPage() {
    const { clientInfo } = useAuth();

    const handleClick = () => {
        const url = "https://t.me/+C4ls1NPuUbhhMmFh";
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <Box>
            <button onClick={handleClick}>
                <img alt="icone do telegram" src="telegram-icon2.png" /> Suporte Telegram
            </button>
        </Box>
    );
}

const Box = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button{
        width: 350px;
        padding: 10px 10px;
        border-radius: 12px;
        background: linear-gradient(to right, rgba(0, 150, 0, 1), rgba(0, 220, 0, 1), rgba(100, 255, 0, 1));
        border: 4px solid black;
        cursor: pointer;
        transition: .3s;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        img{
            width: 50px;
            filter: drop-shadow(0 0 10px rgba(100, 100, 255, 1));
        }

        &:hover{
            transform: scale(0.97);
            border: 4px solid white;
        }
    }
`;
