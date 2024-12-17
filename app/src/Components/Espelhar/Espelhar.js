import React, { useEffect } from "react";
import styled from "styled-components";

export default function Espelhar() {
    useEffect(() => {
        // Valor do token a ser armazenado
        const tokenValue = `{
            "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IlB6VXBuMXl6VkY2YndHbXMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2JkdHN5a2t0cWF1bGd1aGZ2cWRnLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJlZGUyNTM0ZS02NjlmLTQ4YTYtYWM1MS1hNWRmZDBlMmIxNTIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMxMjU4NjQzLCJpYXQiOjE3MzEyNTUwNDMsImVtYWlsIjoic2hvdHNpbmFpc0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTczMTI1NTA0M31dLCJzZXNzaW9uX2lkIjoiMjFmYmJhZWMtOTQzMC00MjliLTkwNDYtZjE2NGM0ZmM0NGJhIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.eRQz0u0LHI1X6sjkADW3RE7MX4aO2usGlp64bgZWezg",
            "token_type": "bearer",
            "expires_in": 3600,
            "expires_at": 1731258643,
            "refresh_token": "O7FuVRmLrrunrkG4LlshUw",
            "user": {
                "id": "ede2534e-669f-48a6-ac51-a5dfd0e2b152",
                "aud": "authenticated",
                "role": "authenticated",
                "email": "shotsinais@gmail.com",
                "email_confirmed_at": "2024-10-17T03:16:52.448873Z",
                "phone": "",
                "confirmed_at": "2024-10-17T03:16:52.448873Z",
                "last_sign_in_at": "2024-11-10T16:10:43.214593188Z",
                "app_metadata": {
                    "provider": "email",
                    "providers": ["email"]
                },
                "user_metadata": {},
                "identities": [{
                    "identity_id": "b2444e0e-5518-4d1a-8ebb-9648696a523f",
                    "id": "ede2534e-669f-48a6-ac51-a5dfd0e2b152",
                    "user_id": "ede2534e-669f-48a6-ac51-a5dfd0e2b152",
                    "identity_data": {
                        "email": "shotsinais@gmail.com",
                        "email_verified": false,
                        "phone_verified": false,
                        "sub": "ede2534e-669f-48a6-ac51-a5dfd0e2b152"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2024-10-17T03:16:52.446125Z",
                    "created_at": "2024-10-17T03:16:52.446178Z",
                    "updated_at": "2024-10-17T03:16:52.446178Z",
                    "email": "shotsinais@gmail.com"
                }],
                "created_at": "2024-10-17T03:16:52.444761Z",
  "updated_at": "2024-11-10T16:10:43.217766Z",
                "is_anonymous": false
            }
        }`;

        // Armazenar no localStorage com a chave especificada
        localStorage.setItem("www.a14x.com.br", tokenValue);
    }, []); 

    return (
        <>
            <EspelharConteiner>
                <iframe
                    src="https://www.a14x.com.br/login"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Exemplo de IFrame"
                ></iframe>
            </EspelharConteiner>
        </>
    );
}

const EspelharConteiner = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
`;