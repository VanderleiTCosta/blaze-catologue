import styled from "styled-components";


export const ChanceDaProxima = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;

    .item{
        width: 120px;
        border: 1px solid white;
        height: 35px;
        cursor: pointer;
        transition: .3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        font-weight: 800;

        &.color0{
            background: rgba(230, 230, 230, 1);
            color: black;

            &:hover{background: rgba(210, 210, 210, 1);}
        }

        &.color1{
            background: rgba(220, 0, 0, 1);
            color: white;
            &:hover{background: rgba(180, 0, 0, 1);}
        }

        &.color2{
            background: rgba(40, 40, 40, 1);
            color: white;
            &:hover{background: rgba(25, 25, 25, 1);}
        }
    }
`;

export const PedrasSelecionadas = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-top: 20px;

    .item{
        width: 40px;
        height: 40px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 18px;
        box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.4);
        cursor: pointer;
        background: rgba(230, 230, 230, 1);
        color: black;
        box-sizing: border-box;

        span{
            color: transparent;
            width: 60%;
            height: 60%;
            border: 2px solid white;
            border-radius: 50%;
        }


        &.color-1{
            background: rgba(220, 0, 0, 1);
            color: white;
        }
        &.color-2{
            background: rgba(50, 50, 50, 1);
            color: white;
        }
    }
`;

export const SelecionarPedras = styled.div`
    width: max-content;
    display: flex;
    gap: 5px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;

    button{
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: CENTER;
        justify-content: center;
        background: rgba(230, 230, 230, 1);
        color: black;
        cursor: pointer;
        font-weight: 800;
        font-size: 14px;
    }

    .quantidadeDePedrasBox{
        width: 30px;
        height: 30px;
        display: flex;
        align-items: CENTER;
        justify-content: center;
        background: rgba(230, 230, 230, 1);
        color: black;
    }

    span{
        font-size: 22px;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.7);
    }

    input{
        max-width: max-content;
        padding: 0 5px;
        box-sizing: border-box;
        height: 35px;
        box-sizing: border-box;
        text-align: center;
        font-size: 18px;
    }
`;

export const TabelaPedras = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p{
        font-size: 32px;
        margin: 0;
        font-weight: 800;
        color: white;
    }

    @media(max-width: 1200px){
        width: 250px;
    }
`;


export const TabelasInferiores = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;

    @media(max-width: 1200px){
        flex-direction: column;
        align-items: center;
    }
`;

export const SecondPageDivide = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const TableTendencia = styled.div`
    width: 100%;
    display: flex;
    height: max-content;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;

    @media(max-width: 1200px){
        width: 250px;
    }
`;

export const Tendencia = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 32px;
        color: rgba(255, 255, 255, 1);
        margin: 0;
        font-weight: 800;
    }
`;

export const Devendo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 22px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
        margin-top: 20px;
        font-weight: 800;
    }
`;

export const TableTendenciaBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-height: 600px;
    overflow: auto;
`;

export const TableTendenciaLine = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;
    width: 100%;

    .item {
        width: 100%;
        height: 50px;
        border-radius: 6px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: rgba(40, 40, 60, 1);
        color: white;
        font-weight: 800;
    }

    .it-1 {
        background: white;
        color: black;
    }

        .it-2 {
        background: red;
    }

    .it-3 {
        background: rgba(40, 40, 40, 1);
    }
`;

export const Dash1 = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: linear-gradient(to right, rgba(20, 20, 20, 1), rgba(0, 0, 0, 1), black, rgba(20, 20, 20, 1));
    height: 100vh;
    overflow-y: auto;
    z-index: 99;
    padding-bottom: 100px;
    box-sizing: border-box;

    &.ativo {
        display: flex;
        flex-direction: column;
        padding-top: 100px;
        align-items: center;
    }

    &.desativo {
        display: none;
    }
`;

export const Conteudo = styled.div`
    position: relative;

    .buttonBack {
        padding: 5px 20px;
        background: red;
        position: fixed;
        bottom: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 18px;
        font-weight: 800;
        border-radius: 6px;
        cursor: pointer;
        transition: .3s;

        &:hover {
            transform: scale(0.98);
            color: white;
        }
    }

    .nav-section {
        min-width: 90vw;
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;

        button {
            width: 60%; 
            background-color: rgba(15, 15, 15, 1);
            color: white;
            border: 0;
            height: 30px;
            font-size: 12px;
            border-radius: 4px;
            box-shadow: 1px 2px 2px rgba(50, 50, 50, 0.4);
            transition: .3s;
            cursor: pointer;
            border-right: 4px solid transparent;
            box-sizing: border-box;

            &:hover {
                background: rgba(30, 30, 30, 1);
                border-right: 4px solid red;
            }

            &.selected {
                background: rgba(30, 30, 30, 1);
                border-right: 2px solid red;
            }
        }
    }

    .infoAbout14x {
        min-width: 90vw;
        display: flex;
        margin-top: 20px;
        flex-direction: column;

        .title {
            width: 100%;
            color: white;
            font-size: 18px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            padding: 5px 0;
            border-radius: 6px;
            background: rgba(30, 30, 30, 1);
        }

        .whenAbout {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px 5px;

            .op {
                width: 100%;
                display: flex;
                gap: 30px;
                box-sizing: border-box;
                align-items: center;
                position: relative;

                .icone-14x {
                    width: 45px;
                    height: 45px;
                    border-radius: 6px;
                }

                .icone-14x2 {
                    width: 45px;
                    height: 45px;
                    border-radius: 6px;
                    position: absolute;
                    left: 20px;
                    opacity: 1;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    top: 0;
                }

                .descrip {
                    margin: 0;
                    font-size: 18px;
                    text-align: start;
                    color: rgba(255, 255, 255, 1);
                    font-weight: 600;

                    .boldaIsso {
                        font-weight: 800;
                        color: white;
                    }
                }
            }
        }
    }

    .infoAboutColors {
        min-width: 90vw;
        display: flex;
        flex-direction: column;

        .title {
            width: 100%;
            color: white;
            font-size: 18px;
            border: 2px solid rgba(255, 255, 255, 0.6);
            padding: 5px 0;
            border-radius: 6px;
            background: rgba(30, 30, 30, 1);
        }

        .corPorHorarioOp {
            width: 100%;
            display: flex;
            gap: 2px;
            box-sizing: border-box;
             margin-top: 20px;

            button {
                background-color: rgba(15, 15, 15, 1);
                color: white;
                width: 100%;
                border: 0;
                height: 30px;
                font-size: 12px;
                border-radius: 4px;
                box-shadow: 1px 2px 2px rgba(50, 50, 50, 0.4);
                transition: .3s;
                cursor: pointer;
                border-right: 4px solid transparent;
                box-sizing: border-box;

                &:hover {
                    background: rgba(30, 30, 30, 1);
                    border-right: 4px solid red;
                }

                &.selected {
                    background: rgba(30, 30, 30, 1);
                    border-right: 2px solid red;
                }
            }
        }

        .porcentagemPorHora {
            width: 100%;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .itemHour {
                width: 100%;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;

                .hourTime {
                    width: 20%;
                    font-size: 18px;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 800;
                }

                .item-box {
                    width: 100%;
                    height: 30px;
                    border-radius: 3px;
                    font-size: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &.black {
                        background: rgba(50, 50, 50, 1);
                        color: white;
                    }

                    &.red {
                        background: red;
                        color: white;
                    }

                    &.white {
                        background: white;
                        color: black;
                    }
                }
            }
        }
    }
`;

export const TableDevendo = styled.div`
    width: 100%;
    display: flex;
    height: 600px;
    overflow: auto;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`

export const TableDevendoColumns = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;

    .Column {
        width: 100%;
        border: 2px solid white;
        color: white;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 22px;
        text-align: center;
        background: rgba(40, 40, 40, 1);
    }
`

export const TableBody = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TableDevendoRows = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;

    .Row {
        width: 100%;
        border: 2px solid white;
        border-top: 0;
        color: white;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 18px;
        text-align: center;
    }
`

export const MartinGaleArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    @media(max-width: 1400px){
        width: 100%;
    }
`;

export const TabelaMartinGale = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 400px;

    .columns{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        .it{
            width: 100%;
            height: 30px;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            border: 2px solid rgba(255, 255, 255, 1);
        }

        .color-0{
            background: rgba(230, 230, 230, 1);
        }

        .color-1{
            background: rgba(180, 0, 0, 1);
        }

        .color-2{
            background: rgba(20, 20, 20, 1);
        }
    }

    .rows{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .row{
            display: grid;
            width: 100%;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

            .it{
                width: 100%;
                height: 30px;
                color: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 16px;
                border: 2px solid rgba(255, 255, 255, 1);
            }

        }
    }
`;