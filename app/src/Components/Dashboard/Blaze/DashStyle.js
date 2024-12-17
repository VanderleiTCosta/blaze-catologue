import styled, { keyframes } from "styled-components";

// Animação de fundo para simular movimento das cores do fogo da esquerda para a direita
const fireAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  70% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

export const DashContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: red;
    overflow-y: auto;
    display: flex;
    box-sizing: border-box;
    gap: 10px;
    background: linear-gradient(-45deg, rgba(20, 20, 20, 1), rgba(50, 50, 50, 1), rgba(20, 20, 20, 1));
   
    @media(max-width: 1400px){
        height: max-content;
    }

    .botaoAcionarMobile{
        z-index: 5;
        cursor: pointer;
        display: flex;
        position: fixed;
        top: 10px;
        left: 10px;
        width: 60px;
        z-index: 99;
        height: 60px;
        background: linear-gradient(45deg, rgba(0,0,0,1), rgba(30, 30, 30, 1), rgba(40, 40, 40, 1));
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;

        img{
            width: 70%;
            opacity: 0.6;
        }
    }

    .botaoMostrarBlaze{
        z-index: 9999999;
        cursor: pointer;
        display: flex;
        position: fixed;
        top: 10px;
        right: 10px;
        width: 60px;
        z-index: 9999;
        height: 60px;
        background: linear-gradient(45deg, rgba(0,0,0,1), rgba(30, 30, 30, 1), rgba(40, 40, 40, 1));
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(220, 0, 0, 1);

        img{
            width: 100%;
            opacity: 0.6;
        }
    }
`;

export const DashArea = styled.div`
    width: 100%;
    height: max-content;
    overflow: hidden;
    background: black;
    display: flex;
    padding: 20px 40px;
    filter: drop-shadow(0 0 10px black);
    box-sizing: border-box;
    gap: 10px;
    border-radius: 6px;
    transition: .3s;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    @media (max-width: 1400px){
        background: black;
        flex-wrap: wrap-reverse;
        height: max-content;
        padding: 0;
    }   

`;

export const Dash21Union = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    height: 350px;
    justify-content: center;

    @media(max-width: 1400px){
        height: max-content;
        flex-wrap: wrap;
    }
`;

export const TipoDeTitulo = styled.p`
    margin: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 22px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.8);
`;

export const DashSecond = styled.div`
    height: max-content;
    box-sizing: border-box;
    overflow-y: hidden;    
    width: 100%;
    display: flex;
    flex-direction: column;
    background: transparent;
    align-items: center;
    border-radius: 6px;
    gap: 5px;

    @media(max-width: 1400px){
        height: max-content;
    }


    .dash21 {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        border-radius: 6px;
        align-items: center;

        @media (max-width: 1400px){
            height: max-content;
            padding-top: 0;
        }

        .dash211Box {
            box-sizing: border-box;
            border-radius: 6px;
            flex-direction: column;
            width: 100%;
            background: linear-gradient(-45deg, rgba(20, 20, 20, 1), rgba(30, 30, 30, 1), rgba(20, 20, 20, 1));
            box-shadow: 3px 3px 1px rgba(50, 50, 50, 1);
            position: relative;

            @media(max-width: 1400px){
                width: 100%;
                min-width: 100%;
                min-height: 350px;
            }

            &.dash211BoxNone{
                background: transparent;
            }

    
            .dash211Box1 {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border-radius: 6px;
                align-items: center;
                display: flex;
                justify-content: center;
                flex-direction: column;
                position: relative;
                overflow: none;

                @media(max-width: 1400px){
                    min-width: 100%;
                }

                .timerAndProxima{
                    display: flex;
                    // padding: 0 40px;
                    align-items: center;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    .Timer {
                        width: 100%;
                        border-radius: 6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-weight: 800;
                        gap: 5px;
                        transition: .3s;

                        img{
                            width: 0px;
                            opacity: .6;
                            transition: .3s;
                        }

                        span{
                            font-size: 28px;
                            font-weight: 800;
                        }

                        &:hover{
                            color: white;

                            img{
                                opacity: 1;
                            }
                        }
                    }

                    .proximaJogada {
                        width: 100%;
                        // height: 80px;
                        padding: 30px 0;
                        background-size: 200% 200%; 
                        border-radius: 6px;
                        display: flex;
                        color: white;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        overflow: hidden; 
                        text-shadow: 1px 1px 1px black, 0 0 6px rgba(0,0,0,0.4);
                        font-weight: 600;
                        gap: 10px;
                        font-size: 26px;
                        flex-direction: column;
            

                        .CaixaPreta,.CaixaVermelha{
                            width: 45px;
                            height: 45px;
                            border-radius: 6px;
                            border: 2px solid white;
                            padding: 6px;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            h6{
                                margin: 0;
                                width: 100%;
                                height: 100%;
                                color: rgba(0,0,0,0);
                                padding: 6px;
                                box-sizing: border-box;
                                border: 2px solid white;
                                border-radius: 50%;
                            }
                        }

                        .CaixaVermelha{
                            background: rgba(180, 0, 0, 1);
                        }

                        .CaixaPreta{
                            background: rgba(40, 40, 40, 1);
                        }
                        
                        animation: ${fireAnimation} 3s linear infinite; 

                        z-index: 0; 

                        .content {
                            position: relative; 
                            z-index: 1;
                        }

                        .proximaMsg{
                            color: white;
                            margin-right: 10px;
                        }

                        .proximaicon{
                            width: 20px;
                            height: 20px;
                            border: 2px solid white;
                            border-radius: 50%;
                        }
                    }
                }


                .apostas-box {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    align-items: center;
                    justify-content: center;

                    .aposta-box {
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
                        font-weight: 800;
                        gap: 5px;
                    }

                    .box-icone{
                        width: 35px;
                        height: 35px;
                        border: 1px solid white;
                        border-radius: 6px;
                        overflow: hidden;

                        img{
                            width: 100%;
                            height: 100%;
                        }

                        &.white{
                            background: white;
                        }

                        &.black{
                            background: rgba(10, 10, 10, 1);
                        }

                        &.red{
                            background: rgba(180, 0, 0, 1);
                        }
                    }


                }
            }
        }

        .dash211Box2 {
            width: 100%;
            height: 100%;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            // padding: 10px;
            justify-content: center;
            border-radius: 6px;
            align-items: center;

            @media(max-width: 1400px){
                overflow: hidden;
                height: 350px;
                align-items: center;
                justify-content: center;
            }

            .blazeGirou {
                width: 100%;
                height: 100px;
                border-radius: 6px;
                display: grid;
                grid-template-columns: 2fr 2fr;
                align-items: center;
                justify-content: center;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;

                @media(max-width: 1400px){
                    width: 100%;
                }

                span{
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    width: 100%;
                }

                .statusMessage{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }

                .oqueGirou{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;

                    .boxzinha{
                        width: 55px;
                        height: 55px;
                        border-radius: 12px;
                        padding: 6px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;


                        &.color-1{
                            background: rgba(180, 0, 0, 1);
                            color: white;
                        }

                        &.color-0{
                            background: rgba(230, 230, 230, 1);
                            color: black;
                        }

                        &.color-2{
                            background: rgba(10, 10, 10, 1);
                            color: white
                        }

                        .circleNumber{
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 600;
                            overflow: hidden;
                            position: relative;

                            img{
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                            }

                            &.true{
                                border: 3px solid rgba(255, 255, 255, 1);
                            }
                        }
                    }

                    .time{
                        margin: 0;
                        font-size: 12px;
                        font-weight: 800;
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }

            .grafico {
                display: flex;
                align-items: center;
                justify-content: center;
                height: max-content;
                flex-direction: column;
                overflow: hidden;
                // gap: 20px;
                width: 200px;

                @media(max-width: 1400px){
                    width: 200px;
                }

                .Titulo{
                    font-size: 18px;
                    font-weight: 800;
                    margin: 0;
                    width: 100%;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.8);
                }
            }
        }

        .dash211Box3 {
            width: 100%;
            height: 100%;
            display: flex;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;
        }
    }

    .dash22 {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin-top: 5px;
        box-sizing: border-box;
        border-radius: 6px;
        gap: 5px;
        background: linear-gradient(-45deg, rgba(20, 20, 20, 1), rgba(30, 30, 30, 1), rgba(20, 20, 20, 1));
        box-shadow: 3px 3px 1px rgba(40, 40, 40, 1);

        .dash22Box {
            width: 100%;
            height: 110px;
            display: flex;
            flex-direction: column;
            padding: 4px 6px;
            box-sizing: border-box;
            gap: 5px;

            p{
                margin: 0;
                font-size: 12px;
                font-weight: 800;
                color: rgba(240, 240, 240, 1);
                width: 100%;
                display: flex;
                justify-content: start;
            }

            .divDeBox{
                max-width: 100%;
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding: 10px 0;
                box-sizing: border-box;
                
                .boxContagem{
                    min-width: 60px;
                    height: 60px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    font-size: 22px;
                    font-weight: 800;
                    justify-content: center;
                }
                
                .boxIntervalo{
                    min-width: 70px;
                    height: 70px;
                    border-left: 2px solid rgba(244, 244, 244, 0.8);
                    border-right: 2px solid rgba(244, 244, 244, 0.8);
                    background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2), rgba(0,0,0,0.6));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 2px;

                    .qtt{
                        font-weight: 800;
                        font-size: 22px;
                        color: white;
                    }

                    .hour{
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
    }
`;

export const DashScroll = styled.div`
    width: 100%;
    height: 300vh;
    overflow: auto;
`;

export const DashGiros = styled.div`
    width: 100%;
    height: auto;
    background: rgba(20, 20, 20, 1);
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    gap: 20px;
    box-shadow: 3px 3px 1px rgba(40, 40, 40, 1);

    .titelAndPagination{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: max-content;

        @media(max-width: 1400px){
            flex-direction: column;

            .pagination{
                button{
                    width: 80px;
                }
            }
        }

        .title{
            width: 100%;
            display: flex;
            justify-content: start;
            font-size: 22px;
            color: rgba(240, 240, 240, 0.8);
            font-weight: 800;
        }

        .pagination{
            display: flex;

            span{
                color: rgba(255, 255, 255, 0.7);
                font-weight: 600;
                width: max-content;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 10px;
            }

            button{
                height: 30px;
                width: 100px;
                cursor: pointer;
                border-radius: 6px;
                font-size: 16px;
            }
        }
    }


    
`;

export const DashboardBlaze = styled.div`
    background: red;
    position: relative;

`;

export const CoresPorMinContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    // grid-template-rows: 2fr 10fr;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 20px;
    overflow-y: auto;

    h2{
        width: 100%;
        margin: 0;
        text-align: start;
        color: white;
        font-size: 18px;
        font-weight: 800;
        display: flex;
        gap: 10px;

        select{
            font-size: 16px;
            background: transparent;
            height: max-content;
            color: white;
            border-radius: 3px;
            cursor: pointer;
        }
    }

    @media(max-width: 1400px){
        width: 100%;
        height: 300px;
    }
`;

export const CoresPorMinTabela = styled.div`
    width: 90%;
    height: max-content;
    overflow-y: auto;
    padding: 10px;
    border-radius: 6px;
    background: rgba(0,0,0,1);
    box-sizing: border-box; 
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    box-shadow: 6px 6px 1px rgba(50, 50, 50, 1);
    gap: 5px;

    .itemCorPorMin{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 2fr;
        gap: 10px;

        .primeiro, .red, .black, .white{
            width: 100%;
            height: 25px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .primeiro{
            color: white;
            font-size: 16px;
            background: rgba(50, 50, 50, 1);
        }

        .red{
            color: white;
            font-size: 16px;
            background: rgba(180, 0, 0, 1);
        }

        .black{
            color: white;
            font-size: 16px;
            background: rgba(30, 30, 30, 1);
        }

        .white{
            color: black;
            font-size: 16px;
            background: rgba(230, 230, 230, 1);
        }
    }
`;


export const PadroesRepetidos = styled.div`
    width: 100%;
    // height: 90%;
    overflow-y: auto;
    padding: 5px;
    // border: 2px solid white;
    box-shadow: 3px 3px 1px rgba(40, 40, 40, 1);
    border-radius: 3px;
    background: rgba(0,0,0,1);
    box-sizing: border-box; 
    display: flex;
    flex-direction: column;
    gap: 5px;

    .itemCorPorMin{
        width: 100%;
        display: flex;
        gap: 2px;
        // background: white;
        justify-content: center;

        .primeiro, .red, .black, .white{
            width: 100%;
            height: 25px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .primeiro{
            color: white;
            font-size: 16px;
            background: rgba(50, 50, 50, 1);
            border: 2px solid black;
        }

        .red, .black, .white{border: 2px solid white;}

        .red{
            color: white;
            font-size: 16px;
            background: rgba(220, 0, 0, 1);
        }

        .black{
            color: white;
            font-size: 16px;
            background: rgba(30, 30, 30, 1);
        }

        .white{
            color: black;
            font-size: 16px;
            background: rgba(230, 230, 230, 1);
        }
    }
`;

export const GirosMinutosFinaisContainer = styled.div`
    width: 100%;

    @media(max-width: 1400px){
        width: 100%;
        overflow-x: auto;
    }
`;

export const GirosMinutosFinais = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 10px;
    box-sizing: border-box;

    @media(max-width: 1400px){
        width: max-content;
    }
`;

export const ItemGirosMinFinal = styled.div`
    width: 100%;
    background: rgba(10, 10, 10, 1);
    border-radius: 6px;
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 5px;
    box-sizing: border-box;
    box-shadow: 2px 2px 1px rgba(30, 30, 30, 1);

    @media(max-width: 1400px){
        min-width: 150px;
    }

    span{
        color: white;
        font-weight: 800;
        font-size: 22px;
    }

    .itemBox{
        width: 80%;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 18px;
        &.color-0{
            color: black;
            background: white;
        }

        &.color-1{
            color: white;
            background: rgba(180, 0, 0, 1);
            text-shadow: 1px 1px 1px rgba(0,0,0,1);
        }

        &.color-2{
            color: white;
            background: rgba(50, 50, 50);
            text-shadow: 1px 1px 1px rgba(0,0,0,1);
        }
    }
`;

export const BoxRoller = styled.div`
    width: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
`;

export const BoxDeDivs = styled.div`
    width: max-content;
    min-height: 500px;
    max-height: max-content;
    display: flex;
    gap: 10px;                     
    flex-wrap: wrap;              
    overflow: auto;               
    align-items: start;             /* Alinhar itens pela parte superior */
    justify-content: end;    
    padding: 0px 0 0 0;
    box-sizing: border-box;


    @media(max-width: 1400px) {
        padding: 10px;
        width: 100%;
    }

    .boxZinhaPai {
        display: flex;
        flex-direction: column;      /* Cada boxZinha para ter a data embaixo da "box" */
        gap: 3px;

        .time {
            font-size: 14px;
            color: white;
            text-align: center;        /* Centraliza a hora em relação ao box */
        }

        .boxZinha {
            @media(max-width: 1200px) {
                height: 30px;         /* Responsividade para telas menores */
            }

            width: 60px;
            height: 60px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;    /* Centraliza o conteúdo */
            font-weight: 800;
            border: 3px solid rgba(60, 60, 60, 0.5);
            overflow: hidden;
            cursor: pointer;

            &:hover {
                span {
                    border: 3px solid rgba(255, 255, 255, 1); 
                }
            }

            span {
                width: 45px;
                height: 45px;
                box-sizing: border-box;
                border: 3px solid rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 30px;
                    height: 30px;
                    transform: scale(1.5);
                }
            }
        }
    }

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
    display: flex;
    align-items: center;
    justify-content: center;
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