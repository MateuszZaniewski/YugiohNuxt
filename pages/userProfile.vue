<script setup>
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; 
const { auth } = useFirebase();

const runtimeConfig = useRuntimeConfig()

const firebaseConfig = {
  apiKey: runtimeConfig.public.API_KEY,
  authDomain: runtimeConfig.public.AUTH_DOMAIN,
  projectId: runtimeConfig.public.PROJECT_ID,
  storageBucket: runtimeConfig.public.STORAGE_BUCKET,
  messagingSenderId: runtimeConfig.public.MESSAGING_SENDER_ID,
  appId: runtimeConfig.public.APP_ID,
  measurementId: runtimeConfig.public.MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const docRef = doc(db, "users");
const docSnap = await getDoc(docRef);


const currentUser = ref()

const logout = () => {
  signOut(auth).then(() => {
    navigateTo('/');
}).catch((error) => {
  // An error happened.
});
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user
    console.log(user.email)
  } else {
  }
});
});



</script>
<template>

    <span>User profile</span>

    <h1>Hello {{ currentUser ? currentUser.displayName : null }}</h1>

    <button @click="logout">Logout</button>


</template>