import React, { act, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./HomeStyle";
import { useAuth } from "../../context/AuthContext";
import FirstPage from "../FirstPage/FirstPage";
import SecondPage from "../SecondPage";
import ThirdPage from "../ThirdPage";
import NavComponent from "../Nav";
import NavbarComponent from "../Navbar";
import FourthPage from "../FouthPage";
import AdminArea from "../AdminArea/AdminArea";
import { useRef } from "react";

export default function Home() {
    const { logout, clientInfo } = useAuth();
    const [navSelected, setNavSelected] = useState(1);
    const [actualTab, setActualTab] = useState(null);
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        if (!clientInfo)
            navigate("/login")
    }, [clientInfo]);


    const handleSelectItem = (id) => {
        console.log(`Item com id ${id} clicado`);
        setNavSelected(id);
    };


    const handleReturnPage = () => {
        switch (navSelected) {
            case 1:
                setActualTab(<FirstPage />)
                break;
            case 2:
                setActualTab(<SecondPage />)
                break;
            case 3:
                setActualTab(<ThirdPage />)
                break;
            case 4:
                setActualTab(<FourthPage />)
                break;
            case 5:
                setActualTab(<AdminArea />)
                break;
            default:
                setActualTab(<FirstPage />)
                break;
        }
    }

    useEffect(() => {
        handleReturnPage();
    }, [navSelected])


    return (
        <S.HomeContent>
            <NavbarComponent setNavSelected={setNavSelected} />
            <NavComponent handleSelectItem={handleSelectItem} navSelected={navSelected} />

            <S.RealHome>
                {actualTab}
            </S.RealHome>
        </S.HomeContent>
    );
}
