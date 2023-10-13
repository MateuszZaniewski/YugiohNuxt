<script setup lang="ts">

import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app)


const email = ref('')
const password = ref('')
const name = ref('')
const currentUser = ref()

const signInUser = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Zostałeś pomyślnie zalogowany');
    const emailAdress = userCredential.user.email;
    const docRef = await addDoc(collection(db, "users"), {
    Name: name.value,
    Email: email.value
  });
    
    if (emailAdress) {
      localStorage.setItem('userEmail', emailAdress.toString());
    }
    navigateTo('/searchPage');
  } catch (error) {
    console.log(error)
  }
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithRedirect(auth, provider)
  }
  catch (error) {
    console.error(error);
  }
}

const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();

  signInWithRedirect(auth, provider)

  .catch((error) => {
    console.log(error)
  });
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Current user : ',user.email)
    navigateTo('/searchPage');
  } 
});
});

</script>

<template>

<section class="bg-[#008F78] h-[100vh] relative">
  <div class="flex pl-5 pt-5 gap-1">
    
    <NuxtLink to="/">
      <NuxtImg class="h-10 w-10 relative z-20 mb-8" src="/backArrow.png" />
    </NuxtLink>
  </div>

  <h1 class="text-xl mx-auto text-center pb-8 pt-24 text-white">Welcome back duelist</h1>

  <div class="flex justify-center flex-col w-[90%] mx-auto">
    <input v-model="name" type="text" placeholder="NAME" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4" />
    <input v-model="email" type="email" placeholder="EMAIL" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4" />
    <input v-model="password" type="password" placeholder="PASSWORD" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4 " />
    <button @click="signInUser" class="border border-[#2D61AF] rounded-lg px-3 py-2 bg-[#2D61AF] text-white">Log in</button>
  </div>
  
  <p class="text-center text-white pt-6 pb-10">Forgot password?</p>

  <div class="flex justify-center gap-10 pb-12 relative z-20">
    <button @click="signInWithGoogle" class="px-5 py-3 bg-white rounded-full">
      <NuxtImg src="/google.svg" height="40px" width="40px"  />
    </button>
    <button @click="signInWithFacebook" class="px-5 py-3 bg-white rounded-full">
      <NuxtImg src="/facebook.svg" height="40px" width="40px"  />
    </button> 
  </div>

  <div class="flex justify-center relative z-20">
    <button @click="navigateTo('/RegisterPage');" class="border border-[#2D61AF] bg-white text-black rounded-3xl px-3 py-2">Create new Account</button>
  </div>
  

  <NuxtImg src="/blob1.svg" class="absolute top-0 left-0 z-1 h-40"/>
  <NuxtImg src="/blob2.svg" class="absolute bottom-0 right-0 z-1 h-56"/>
  

</section>
  
</template>

<style scoped>
</style>
