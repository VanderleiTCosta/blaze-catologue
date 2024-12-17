import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";


const fakeData = [
    { entry: 'Entrada 1', twoX: 0.50, fourteenX: 0.10, banca: 0.60, lucro2X: 0.40, lucro14X: 0.80 },
    { entry: 'Entrada 2', twoX: 1.25, fourteenX: 0.25, banca: 1.50, lucro2X: 1.00, lucro14X: 1.40 },
    { entry: 'Entrada 3', twoX: 3.13, fourteenX: 0.63, banca: 5.00, lucro2X: 1.87, lucro14X: 3.53 },
    { entry: 'Entrada 4', twoX: 7.81, fourteenX: 1.56, banca: 12.81, lucro2X: 5.00, lucro14X: 6.65 },
    { entry: 'Entrada 5', twoX: 19.53, fourteenX: 3.91, banca: 38.66, lucro2X: 16.02, lucro14X: 14.68 },
    { entry: 'Entrada 6', twoX: 48.83, fourteenX: 9.77, banca: 97.26, lucro2X: 39.60, lucro14X: 22.72 },
];

export default function ThirdPage() {
    const { clientInfo } = useAuth();

    return (
        <BoxToolsPage>
            <h1 className="title">Gestão de Entradas (em manutenção)</h1>
            <div className="Principal">
                <div className="config1">
                    <div className="boxInput">
                        <span className="name">Cor - Multiplicador:</span>
                        <span className="value">2,5</span>
                        <div className="incrementor">
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>
                    <div className="boxInput">
                        <span className="name">Proteção - Multiplicador:</span>
                        <span className="value">2,5</span>
                        <div className="incrementor">
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>
                    <div className="boxInput">
                        <span className="name">Número de Entradas:</span>
                        <span className="value">6</span>
                        <div className="incrementor">
                            <button>+</button>
                            <button>-</button>
                        </div>
                    </div>
                    <div className="buttonAnalisar">
                        Analisar
                    </div>
                </div>

                <div className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>GALES</th>
                                <th>2X</th>
                                <th>14X</th>
                                <th>BANCA</th>
                                <th>LUCRO - 2X</th>
                                <th>LUCRO - 14X</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fakeData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.entry}</td>
                                    <td>R$ {row.twoX.toFixed(2)}</td>
                                    <td>R$ {row.fourteenX.toFixed(2)}</td>
                                    <td>R$ {row.banca.toFixed(2)}</td>
                                    <td>R$ {row.lucro2X.toFixed(2)}</td>
                                    <td>R$ {row.lucro14X.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </BoxToolsPage>
    )
}


const BoxToolsPage = styled.div`
    width: 70%;
    // height: 500px;
    border-radius: 12px;
    background: linear-gradient(-45deg, rgba(255,0,0,0.2), rgba(255,0,0,0.4), rgba(255,0,0,0.8), rgba(200,0,0,0.2), rgba(255,0,0,0.2));
    border: 2px solid white;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title{
        width: 100%;
        text-align: start;
        text-shadow: 0 0 10px black;
    }

    .Principal{
        width: 100%;
        height: 100%;
        display: grid;
        gap: 20px;
        box-sizing: border-box;

        .tabela {
            width: 100%;
            border-collapse: collapse;
            // margin-top: 20px;
            // background-color: rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: center;
        }

        .tabela th, .tabela td {
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 10px;
            text-align: left;
            color: white;
        }

        .tabela th {
            background-color: rgba(255, 0, 0, 0.2);
        }

        .tabela tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .tabela tr:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }


        .config1{
            width: 100%;
            display: flex;
            gap: 20px;
            justify-content: center;

            .boxInput{
                width: 200px;
                border-radius: 6px;
                height: 55px;
                background: linear-gradient(-45deg, rgba(0,0,0,1), rgba(0,0,0,1));
                box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: .3s;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 3px 10px;
                justify-content: center;
                position: relative;

                &:hover{
                    border: 1px solid rgba(255, 255, 255, 1);
                    transform: scale(1.05);
                }

                .name{
                    width: 100%;
                    font-size: 12px;
                    color: white;
                    text-align: start;
                }

                .value{
                    width: 100%;
                    font-size: 12px;
                    color: white;
                    text-align: start;
                }

                .incrementor{
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 5px;

                    button{
                        width: 25px;
                        height: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        background: transparent;
                        color: white;
                        font-weight: 600;
                        transition: .3s;

                        &:hover{
                            color: black;
                            background: white;
                        }
                    }
                }
            }

            .buttonAnalisar{
                width: 200px;
                border-radius: 6px;
                height: 55px;
                background: linear-gradient(45deg, rgba(50,180,0,1), rgba(120,255,0,1));
                box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: .3s;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                box-shadow: 0 0 10px black;
                text-shadow: 2px 2px 1px rgba(0,0,0,0.4);
                font-size: 22px;
                padding: 0;
                margin: 0;
                cursor: pointer;
                text-align: center; 
                &:hover{        
                    border: 1px solid rgba(255, 255, 255, 1);
                    transform: scale(1.05);
                }
            }
        }
    }
`;