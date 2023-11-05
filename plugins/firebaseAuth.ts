import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: runtimeConfig.public.API_KEY,
    authDomain: runtimeConfig.public.AUTH_DOMAIN,
    projectId: runtimeConfig.public.PROJECT_ID,
    storageBucket: runtimeConfig.public.STORAGE_BUCKET,
    messagingSenderId: runtimeConfig.public.MESSAGING_SENDER_ID,
    appId: runtimeConfig.public.APP_ID,
    measurementId: runtimeConfig.public.MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const firestoreUser = initUser();

  return {
    provide: {
      app,
      db,
      firestoreUser,
    },
  };
});
