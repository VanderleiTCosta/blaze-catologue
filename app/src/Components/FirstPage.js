import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import BettingComponent from "./Graficos/GraficoFirstPage";
import BettingComponent3 from "./Graficos/GraficoFirstPage3";
import { useNavigate } from 'react-router-dom';
import { useBlaze } from "../context/BlazeContext";
import Container from "./Container/Container";
import Loading from "./Loading/Loading";
import DashBlaze from "./Dashboard/Blaze/DashBlaze"

export default function FirstPage() {
    const { clientInfo, logout } = useAuth();
    const { historico, current, bets } = useBlaze();
    const [dataBlaze, setDataBlaze] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        setDataBlaze({ History: historico, Current: current })
    }, [current, historico])

    if (!clientInfo.NOME)
        logout()


    return (
        <Box>
            <div className="hello">
                Eai {clientInfo.NOME || 'Usuário'}, pronto pra ganhar dinheiro? 🤑
            </div>
            <div className="platformsIntegrated">
                <div className="platformBox" onClick={() => navigate("/dashBlaze")}>
                    <div className="imageBox">
                        <img alt="logo da blaze" src="blaze2.png" className="blaze" />
                        {/* <h1>STATISTICS PLATFORM</h1> */}
                    </div>
                    <DashBlazeContainer>
                        <DashBlaze />
                    </DashBlazeContainer>
                </div>
            </div>
        </Box>
    );
}

const Box = styled.div`
    width: 80%;
    height: 600px;
    border-radius: 12px;
    display: grid;
    grid-template-rows: 1fr 4fr;
    padding: 30px;
    box-sizing: border-box;
    border: 2px solid white;

    @media(max-width: 1500px){
        width: 90%;
        border-radius: 0;
        border: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .hello {
        width: 100%;
        height: 80px;
        border-radius: 12px;
        background: linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1));
        box-shadow: 4px 4px 3px black;
        color: white;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 20px;
        font-size: 24px;
        font-weight: 400;
        border: 2px solid red;

        @media(max-width: 1500px){
            height: max-content;
            padding: 10px 5px;
            justify-content: center;
        }
    }

    .platformsIntegrated {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        transition: .3s;
        max-height: 500px;
        overflow: hidden;
        box-sizing: border-box;

        @media(max-width: 1500px){
            display: flex;
            flex-wrap: wrap;
            height: max-content;
            overflow-y: auto;
        }

        .platformBox {
            height: 100%;
            width: 100%;
            border-radius: 12px;
            box-sizing: border-box;
            box-shadow: 4px 4px 3px black;
            transition: .3s;
            border: 2px solid red;
            cursor: pointer;
            overflow: hidden;
            padding: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            cursor: pointer;

            &:hover {
                border: 2px solid white;
            }

            .imageBox{
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                flex-direction: column;
                width: 100%;
                height: 100%;
                transition: .3s;

                img{
                    width: 200px;
                    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
                    transform: scale(2);
                    transition: .3s;
                                
                }

                .blaze{
                    transform: scale(1.5);
                }
            }


        }
    }
`;

const DashBlazeContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    opacity: 0.1;
    transition: .3s;

    &:hover{
        transform: scale(1.02);
        opacity: 0.05;
    }
`;