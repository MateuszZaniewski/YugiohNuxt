<script setup lang="ts">

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref('')
const password = ref('')

const auth = getAuth();

const signInUser = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    console.log('Zostałeś pomyślnie zalogowany')
    const user = userCredential.user;
    navigateTo('/')
    // ...  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

</script>

<template>

<section class="bg-[#008F78] h-[100vh] relative">
  <div class="flex pl-5 pt-5 gap-1">
    
    <NuxtLink to="/">
      <NuxtImg class="h-10 w-10 relative z-20" src="/backArrow.png" />
    </NuxtLink>
  </div>

  <h1 class="text-xl mx-auto text-center pb-8 pt-24 text-white">Welcome back duelist</h1>

  <div class="flex justify-center flex-col w-[90%] mx-auto">
    <input v-model="email" type="email" placeholder="EMAIL" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4" />
    <input v-model="password" type="password" placeholder="PASSWORD" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4 " />
    <button @click="signInUser" class="border border-[#2D61AF] rounded-lg px-3 py-2 bg-[#2D61AF] text-white">Log in</button>
  </div>

  <p class="text-center text-white pt-6 pb-10">Forgot password?</p>

  <div class="flex justify-center gap-10 pb-12 relative z-20">
    <button class="px-5 py-3 bg-white rounded-full">
      <NuxtImg src="/google.svg" height="40px" width="40px"  />
    </button>
    <button class="px-5 py-3 bg-white rounded-full">
      <NuxtImg src="/facebook.svg" height="40px" width="40px"  />
    </button> 
  </div>

  <div class="flex justify-center relative z-20">
    <button class="border border-[#2D61AF] bg-white text-black rounded-3xl px-3 py-2">Create new Account</button>
  </div>
  

  <NuxtImg src="/blob1.svg" class="absolute top-0 left-0 z-1 h-40"/>
  <NuxtImg src="/blob2.svg" class="absolute bottom-0 right-0 z-1 h-56"/>
  

</section>
  
</template>

<style scoped>
.google {
  background-image: url("../public/google.png");
  background-repeat: no-repeat;
}

.facebook {
  background-image: url("../public/facebook.png");
  background-repeat: no-repeat;
}
</style>
