import styled from "styled-components";


export const HomeContent = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    padding: 0 0 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    // margin-top: 100px;
    // background: red;
    position: relative;

    @media(max-width: 1500px){
        overflow-x: auto;
        padding: 0 0 20px 0;
    }

`;

export const Navbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 80px;
    border-bottom: 2px solid red;
    overflow: hidden;
    max-height: 120px;
    align-items: center;
    background: linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1));

    // @media(max-width: 1500px){
    //     padding: 0 10px;
    // }


    .shot-logo{
        width: 200px;
        transform: scale(1.2);
        cursor: pointer;

    }

    .exit-icon{
        width: 45px;
        cursor: pointer;
        opacity: 0.3;
    }
`;

export const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 30px 0;
    boz-sizing: border-box;

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
    }
`;

export const RealHome = styled.div`
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
`;


export const VideoBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
`;