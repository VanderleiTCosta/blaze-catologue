import styled from "styled-components";

export const BlazeIframeContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px;
    background: black;
    border-radius: 6px;
    filter: drop-shadow(0 0 10px black);
    transition: .3s;
    z-index: 999;
`;