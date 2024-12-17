import React from "react";
import styled from "styled-components";
import { useRef } from "react";

export default function Container({ children }) {
    const videoRef = useRef(null);

    return (
        <>
            <Content>
                {children}
   
            </Content>
        </>
    )
}

const Content = styled.div`
    width: 100%;
    min-height: 100vh;
    // padding: 80px 50px;
    box-sizing: border-box;
    position: relative;
    // background: linear-gradient(-45deg, black, black, rgba(255, 0, 0, 0.2), black, black);
    overflow-y: auto;
    overflow-x: hidden;
    color: white;
`;

const VideoBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;


`;

export const VideoBackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    position: relative;

    video{
        opacity: 0.2;
    }
    .over{
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        // background: black;
    }

    // @media(max-width: 1400px){
    //     video{
    //         display: none;
    //     }
    // }
`;