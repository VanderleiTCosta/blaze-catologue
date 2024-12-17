import styled from "styled-components";


export const LoginContent = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    color: white;

    @media (max-width: 1200px){
        grid-template-columns: 1fr;
    }
`;

export const LoginPart = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background: linear-gradient(-45deg, rgba(25, 25, 25, 1), rgba(25, 25, 25, 1), rgba(25, 25, 25, 1));
    position: relative;

    @media (max-width: 1200px){
        height: 100vh;
    }

    img{
        width: 220px;
        opacity: 0.9;
    }

    p{
        padding-top: 20px;
        margin: 0;
        text-align: center;
        font-size: 26px;
        z-index: 1;
        font-weight:600;
        text-shadow: 4px 4px 2px rgba(255, 0, 0, 0.2);
        
        span{
            color: red;
            font-weight:800;
            opacity: 0.8; 
        }
    }

    .loginBox{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        margin-top: 40px;
        gap: 20px;

        input{
            width: 70%;
            height: 60px;
            border: 0;
            border-radius: 6px;
            box-sizing: border-box;
            padding-left: 20px;
            text-align: start;
            box-shadow: 4px 4px 1px black;
            color: rgba(255, 255, 255, 0.8);
            background: rgba(25, 25, 25, 1);
            border: 2px solid rgba(255, 255, 255, 0.4);
            font-size: 28px;
            font-weight: 600;

            &::placeholder{
                color: rgba(255, 255, 255, 0.8);
            }
        }

        .cadastrese{
            margin: 0;
            margin-top: -10px;
            color: white;
            font-weight: 100;
            text-align: end;
            width: 70%;
            font-size: 16px;
            span{
                margin: 0;
                color: rgba(255, 100, 0, 1);
                font-weight: 500;
                cursor: pointer;
            }
        }

        button{
            width: 70%;
            height: 60px;
            border: 0;
            border-radius: 6px;
            background: rgba(255, 0, 0, 1);
            color: white;
            font-weight: 500;
            font-size: 24px;
            cursor: pointer;
            transition: .3s;

            &:hover{
                transform: scale(0.97);
            }
        }
    }
`;

export const LoginPart2 = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url("wallpaper-login3.jpg") no-repeat center center;
    background-size: cover;
    position: relative;

    @media (max-width: 1200px){
        display: none;
    }

    .fundo-preto{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 50px;



        p{
            margin: 0;
            font-size: 28px;
            max-width: 70%;
            text-align: start;
            text-shadow: 0 0 10px rgba(0,0,0,1);
            border-bottom: 6px solid red;
            padding-bottom: 10px;
            font-weight: 800;
            filter: drop-shadow(0 5px 15px rgba(255, 0, 0, 0.3));

        }

        img{
            width: 200px;
            border-radius: 50%;
            border: 4px solid black;
            filter: drop-shadow(0 0 15px red);
        }
    }
`;

// export const LoginPart = styled.div``;

// export const LoginPart = styled.div``;

// export const LoginPart = styled.div``;

// export const LoginPart = styled.div``;

// export const LoginPart = styled.div``;

// export const LoginPart = styled.div``;

