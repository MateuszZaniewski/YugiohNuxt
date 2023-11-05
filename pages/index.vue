<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import Button from "primevue/button";
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser;

const fetchRandomCard = async () => {
  const response = await axios.get(
    "https://db.ygoprodeck.com/api/v7/randomcard.php",
  );
};
</script>

<template>
  <Navbar />

  <div class="w-[90%] mx-auto">
    <h1 class="text-3xl text-center pt-7 max-w-xs mx-auto">
      Welcome to Your Ultimate Yu-Gi-Oh Fan Destination
    </h1>

    <p class="text-base text-center pt-10 max-w-sm mx-auto">
      Explore card searches, Craft decks, Share strategies, and cherish Your
      favorites cards
    </p>
  </div>

  <div class="flex justify-center gap-5 pt-12">
    <NuxtLink to="/registerPage">
      <Button v-if="!user" label="Create and Account" severity="info" />
    </NuxtLink>
    <NuxtLink to="/loginPage">
      <Button v-if="!user" label="Login" severity="success" />
    </NuxtLink>
  </div>

  <div class="pt-20 flex justify-center flex-col items-center gap-5">
    <NuxtImg
      @click="fetchRandomCard"
      class="cursor-pointer"
      src="Cards.png"
      height="135"
      width="150"
    />
    <NuxtImg src="arrowUp.png" height="54" width="54" />
  </div>

  <p class="pt-5 text-center">Click on cards to see what’s Your lucky Card</p>
</template>

<style scoped></style>
