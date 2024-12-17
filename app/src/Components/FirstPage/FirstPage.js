import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useBlaze } from "../../context/BlazeContext";
import * as S from "./FirstPageStyle";
import DashBlaze from "../Dashboard/Blaze/DashBlaze";

export default function FirstPage() {
    const { clientInfo, logout } = useAuth();
    const { historico, current, bets } = useBlaze();
    const [dataBlaze, setDataBlaze] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        setDataBlaze({ History: historico, Current: current })
    }, [current, historico])



    return (
        <S.Box>
            <div className="hello">
                Eai {clientInfo.NOME || 'Usuário'}, pronto pra ganhar dinheiro? 🤑
            </div>
            <div className="platformsIntegrated">
                <div className="platformBox" onClick={() => navigate("/dashBlaze")}>
                    <div className="imageBox">
                        <img alt="logo da blaze" src="blaze2.png" className="blaze" />
                    </div>
                    <S.DashBlazeContainer>
                        <DashBlaze />
                    </S.DashBlazeContainer>
                </div>
            </div>
        </S.Box>
    );
}
