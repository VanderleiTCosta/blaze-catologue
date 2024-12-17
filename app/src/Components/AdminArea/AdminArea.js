import React, { useEffect, useState } from "react";
import * as S from "./AdminAreaStyle";
import { useNavigate } from "react-router-dom";

export default function AdminArea() {
   const navigate = useNavigate();


    return (
        <S.AdminAreaContainer>
           <button onClick={() => navigate("/admin")}>Página do Admin</button>
        </S.AdminAreaContainer>
    );
}
