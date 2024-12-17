import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";


const navItems = [
    { Name: "HOME", id: 1 },
    { Name: "CONTA", id: 2 },
    // { Name: "FERRAMENTAS", id: 3 },
    { Name: "SUPORTE", id: 4 },
];

export default function NavComponent({ handleSelectItem, navSelected }) {
    const { clientInfo } = useAuth();


    return (

        <Nav>
            <>
                {navItems.map(item => (
                    <p
                        key={item.id}
                        onClick={() => handleSelectItem(item.id)}
                        className={navSelected === item.id ? "selected" : ""}
                    >
                        {item.Name}
                    </p>
                ))}

                {clientInfo && clientInfo.isAdmin && (
                    <p
                        key="adminarea"
                        onClick={() => handleSelectItem(5)}
                        className={navSelected === 5 ? "selected" : ""}
                    >
                        ÁREA DO ADMIN
                    </p>
                )}
            </>

        </Nav>
    )
}


const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 30px 0;
    boz-sizing: border-box;

    @media(max-width: 1200px){
        // flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    p{
        margin: 0;
        font-size: 28px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: .3s;
        border-bottom: 2px solid transparent;

        &.selected{
            color: red;
            border-bottom: 2px solid red;
            filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.6));
        }

        &:hover{
            color: red;
        }

        @media(max-width: 1500px){
            font-size: 18px;
        }
    }
`;