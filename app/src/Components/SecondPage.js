import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const inputBoxes = [
    { name: "name", text: "Name" },
    { name: "phone", text: "Contato" },
    { name: "address.street", text: "Endereço" },
    { name: "address.city", text: "Cidade" },
    { name: "address.state", text: "Estado" },
    { name: "address.zipcode", text: "CEP" }
];

function formatarTelefone(telefone) {
    const apenasNumeros = telefone.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
        const ddd = apenasNumeros.slice(0, 2);
        const primeiraParte = apenasNumeros.slice(2, 7);
        const segundaParte = apenasNumeros.slice(7, 11);

        return `(${ddd}) ${primeiraParte}-${segundaParte}`;
    } else {
        return 'Número inválido';
    }
}


export default function SecondPage() {
    const { clientInfo } = useAuth();

    console.log(clientInfo)

    return (

        <BoxUserPage>
            <h1 className="title">Perfil do Usuário</h1>
            <div className="userInfo">
                <div className="userPhotoBox">
                    <img alt="foto do usuário" className="photoBoxImg" src="person.png" />
                </div>
                <div className="userProfile">
                    <div className="inputBox">
                        <label >NOME</label>
                        <input readOnly value={clientInfo.NOME ? clientInfo.NOME : "" } />
                    </div>
                    <div className="inputBox">
                        <label >CONTATO</label>
                        <input readOnly value={clientInfo.CONTATO ? clientInfo.CONTATO : ""} />
                    </div>
                    <div className="inputBox">
                        <label >ENDEREÇO</label>
                        <input readOnly value={clientInfo.ENDERECO ? clientInfo.ENDERECO : ""} />
                    </div>
                    <div className="inputBox">
                        <label >CIDADE</label>
                        <input readOnly value={clientInfo.CIDADE ? clientInfo.CIDADE : ""} />
                    </div>
                    <div className="inputBox">
                        <label >CEP</label>
                        <input readOnly value={clientInfo.CEP ? clientInfo.CEP : ""} />
                    </div>
                </div>
            </div>
        </BoxUserPage>
    )
}



const BoxUserPage = styled.div`
    width: 70%;
    height: 500px;
    border-radius: 12px;
    background: linear-gradient(-45deg, rgba(255,0,0,0.2), rgba(255,0,0,0.4), rgba(255,0,0,0.8), rgba(200,0,0,0.2), rgba(255,0,0,0.2));
    border: 2px solid white;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media(max-width: 1500px){
        border: 0;
        border-radius: 0;
        width: 90%;
        height: max-content;
    }

    .title{
        width: 100%;
        text-align: start;
        text-shadow: 0 0 10px black;

        @media(max-width: 1500px){
            text-align: center;
        }
    }

    .userInfo{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 20px;
        box-sizing: border-box;

        @media(max-width: 1500px){
            display: flex;
            flex-direction: column;
        }
    }

    .userPhotoBox, .userProfile{
        width: 100%;
        height: 100%;
        display: flex;
        background: rgba(0,0,0,0.4);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.userPhotoBox{
            padding: 20px;
            background: rgba(0,0,0,0);
            box-sizing: border-box;
            img{
                width: 60%;
            }
        }

        .photoBoxImg{
            width: 80%;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
            transition: .3s;

            @media(max-width: 1500px){
                width: 50%;
            }

            &:hover{
                transform: scale(0.97);
                box-shadow: 8px 8px 2px rgba(0,0,0,0.6);
            }
        }
    }

    .userProfile{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;

        @media(max-width: 1500px){
            padding: 0px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: rgba(0,0,0,0);

        }

        .inputBox{
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: center;

            label{
                font-size: 22px;
                color: white;
                font-weight: 600;

                @media(max-width: 1500px){
                    font-size: 18px;
                }
            }

            input{
                width: 80%;
                height: 30px;
                box-sizing: border-box;
                box-shadow: 4px 4px 2px rgba(0,0,0,0.6);
                padding-left: 20px;
                font-size: 18px;
                font-weight: 600;
                color: rgba(0,0,0,0.6);
            }
        }
    }
`;
