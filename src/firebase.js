// Importa Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyAOCNVJ51X2sqGGK1BxD_fh_zZad-IcnqI",
    authDomain: "pwa-shoesstore.firebaseapp.com",
    projectId: "pwa-shoesstore",
    storageBucket: "pwa-shoesstore.appspot.com",
    messagingSenderId: "261340188248",
    appId: "1:261340188248:web:50971ec27b8e0ca146842d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (si usas Firestore)
const db = getFirestore(app);

export { db };
