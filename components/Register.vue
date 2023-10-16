<script setup lang="ts">
import { collection, addDoc } from "firebase/firestore";

const { $db } = useNuxtApp()
const email = ref('')
const password = ref('')

const createNewUser = async () => {
  const credentials = await createUser(email.value, password.value)
  if(credentials) {
    const docRef = await addDoc(collection($db, "users"), {
    email: email.value,
    password: password.value
  });
  }
}

</script>

<template>
<section class="bg-[#008F78] h-[100vh] relative">
  <div class="flex pl-5 pt-5 gap-1">
    
    <NuxtLink to="/">
      <NuxtImg class="h-10 w-10 relative z-20" src="/backArrow.png" />
    </NuxtLink>
  </div>

  <h1 class="text-xl mx-auto text-center pb-8 pt-16 text-white relative z-20">Welcome back duelist</h1>

  <div class="flex justify-center flex-col w-[90%] mx-auto">
    <input v-model="email" type="email" placeholder="EMAIL" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4" />
    <input v-model="password" type="password" placeholder="PASSWORD" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4 " />
    <input type="password" placeholder="PASSWORD" class="border rounded-lg border-black px-3 py-2 placeholder:text-black mb-4 " />
    <button @click="createNewUser" class="border border-[#2D61AF] rounded-lg px-3 py-2 bg-[#2D61AF] text-white">Create an account</button>
  </div>

  <p @click="navigateTo('/LoginPage');" class="text-center text-white pt-6 pb-10">Already registered?</p>
  

  <NuxtImg src="/blob1.svg" class="absolute top-0 left-0 z-1 h-40"/>
  <NuxtImg src="/blob2.svg" class="absolute bottom-0 right-0 z-1 h-56"/>
  

</section>
</template>

<style scoped></style>
