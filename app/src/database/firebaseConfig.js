import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBFTzAmIsCC2usW8ZcjBW1WGEN190m2nAg",
  authDomain: "blaze-jon-15807.firebaseapp.com",
  projectId: "blaze-jon-15807",
  storageBucket: "blaze-jon-15807.firebasestorage.app",
  messagingSenderId: "983086973602",
  appId: "1:983086973602:web:93da58cd2c5ec7f02b8dfb"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação
const auth = getAuth(app);

// Inicializa o Firestore
const db = getFirestore(app); // Adiciona esta linha

// Exporta os serviços para uso em outras partes do aplicativo
export { auth, db }; // Exporta também o db
