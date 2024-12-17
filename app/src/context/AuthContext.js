import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../database/firebaseConfig';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [clientInfo, setClientInfo] = useState(() => {
    try {
      const storedClientInfo = localStorage.getItem('clientInfo');
      return storedClientInfo ? JSON.parse(storedClientInfo) : null;
    } catch (error) {
      console.error('Failed to parse clientInfo from localStorage', error);
      return null;
    }
  });


  const login = async (email, password, setLoad) => {
    try {
      setLoad(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      const clientDocRef = doc(db, "CLIENTES", email);
      const clientDocSnap = await getDoc(clientDocRef);

      if (clientDocSnap.exists()) {
        const clientData = clientDocSnap.data();

        if (clientData.isAdmin === true) {
          clientData.isAdmin = true;   
        }

        setClientInfo(clientData);
        localStorage.setItem('clientInfo', JSON.stringify(clientData));
        setAuthState(true);
        localStorage.setItem('isAuthenticated', 'true');
        setLoad(false);

        navigate("/home");
      } else {
        console.error("No client document found with this email.");
        alert("Informações do cliente não encontradas.");
        setLoad(false);

      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login: verifique suas credenciais');
      setLoad(false);

    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      setAuthState(false);
      setClientInfo(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('clientInfo');
    }).catch(error => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ auth: authState, clientInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
