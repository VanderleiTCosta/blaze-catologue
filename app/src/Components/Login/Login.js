import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";
import * as S from "./LoginStyle";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const { login } = useAuth();


  const handleLoginClick = () => {
    login(email, password, setLoad);
  };

  return (
    <>
      <Loading status={load} />
      <S.LoginContent>
        <S.LoginPart>
          <img alt="logo shot company" src="person.png" />
          <p>Sua Plataforma de Apostas <span>Profissional</span></p>
          <div className="loginBox">
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLoginClick}>Entrar</button>
          </div>
        </S.LoginPart>
        <S.LoginPart2>
          <div className="fundo-preto">
            <p>
              Bem-vindo à plataforma revolucionária projetada
              para profissionais de apostas que buscam
              maximizar suas estratégias e aumentar
              suas chances de sucesso.
            </p>
            <img alt="logo shot company" src="shot-logo.jpeg" />
          </div>
        </S.LoginPart2>
      </S.LoginContent>
    </>

  );
}
