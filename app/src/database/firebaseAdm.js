import admin from "firebase-admin";
import serviceAccount from "./chavePlataforma.json";

// Inicializa o aplicativo Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exporta a referência do Firestore
const db = admin.firestore();

export { db };
