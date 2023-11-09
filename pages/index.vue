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

  </div>

  <UContainer class="pt-10">
    <div class="py-5">
      <div class="flex items-center gap-1 pb-2">
        <UIcon name="i-heroicons-magnifying-glass" />
        <h2>Discover the Power of Search</h2>
      </div>
      
      <p>Unleash the full potential of your deck with our comprehensive card search feature. Find the perfect cards to enhance your strategy and dominate the battlefield.</p>
    </div>
    
    <div class="py-5">
      <div class="flex items-center gap-1 pb-2">
        <UIcon name="i-heroicons-cube" />
        <h2>Build Your Perfect Deck</h2>
      </div>
      
      <p>Unleash your inner strategist and construct your dream deck with ease. Our intuitive deck-building tools empower you to create unstoppable combinations and reign supreme in every duel.</p>
    </div>
    
    <div class="py-5">
      <div class="flex items-center gap-1 pb-2">
        <UIcon name="i-heroicons-users" />
        <h2>Connect with Fellow Duelists</h2>
      </div>
      
      <p>Forge alliances, challenge rivals, and make new friends within our vibrant community of Yu-Gi-Oh enthusiasts. Dive into the world of dueling and connect with like-minded players to exchange tips, tricks, and strategies.</p>
    </div>
    
    <div class="py-5">
      <div class="flex items-center gap-1 pb-2">
        <UIcon name="i-heroicons-document" />
        <h2>Stay in Control with Your cards</h2>
      </div>
      
      <p>Keep your most cherished cards close at hand by adding them to your favorites. Never lose track of the cards that define your winning strategy and personal style.</p>
    </div>
    

  </UContainer>

  <!-- <div class="flex justify-center gap-5 pt-12">
    <NuxtLink to="/registerPage">
      <button v-if="!user">Create and Account</button>
    </NuxtLink>
    <NuxtLink to="/loginPage">
      <button v-if="!user">Login</button>
    </NuxtLink>
  </div> -->

  <!-- <div class="pt-20 flex justify-center flex-col items-center gap-5">
    <NuxtImg
      @click="fetchRandomCard"
      class="cursor-pointer"
      src="Cards.png"
      height="135"
      width="150"
    />
    <NuxtImg src="arrowUp.png" height="54" width="54" />
  </div>

  <p class="pt-5 text-center">Click on cards to see what’s Your lucky Card</p> -->
</template>
