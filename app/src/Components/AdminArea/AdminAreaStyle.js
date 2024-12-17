import styled from "styled-components";

export const AdminAreaContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    button{
        width: 300px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
        background: linear-gradient(to right, rgba(0,0,200, 1),rgba(0,100,255, 1));
        border-radius: 6px;
        cursor: pointer;
        transition: .3s;
        
        &:hover{
            transform: scale(0.97);
        }
    }
`;