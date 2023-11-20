<script setup>

import { useUserStore } from '~/store/user'
const userStore = useUserStore();
const { $firestoreUser } = useNuxtApp();
const checkIfUser = await $firestoreUser

if(checkIfUser){
  const user = await userStore.loadGoogleUser()
  const firestoreUser = await userStore.loadFirestoreCurrentLogedUser(user)
  console.log(user)
  console.log(firestoreUser)
}



</script>

<template>
  <Navbar />

  <div class="w-[90%] mx-auto">
    <h1 class="text-3xl text-center pt-7 max-w-xs mx-auto font-[yugioh]">
      Welcome to Your Ultimate Yu-Gi-Oh Fan Destination
    </h1>

  </div>

  <UContainer class="pt-10">
    <div class="py-5 flex gap-5 max-w-[750px] md:mx-auto">
      <div class="mr-[10%]">
        <div class="flex items-center gap-1 pb-2">
          <UIcon name="i-heroicons-magnifying-glass" />
          <h2 class="font-bold text-[#2D61AF] ">Discover the Power of Search</h2>
        </div>
        
      <div class="md:flex gap-2 ">
        <p class="font-[yugioh] pb-2">Unleash the full potential of your deck with our comprehensive card search feature. Find the perfect cards to enhance your strategy and dominate the battlefield.</p>
        <NuxtLink :to="`card/Blue-Eyes White Dragon`">
          <NuxtImg src="/blueeyes.png" class="max-w-[250px] max-h-[250px] mx-auto" ></NuxtImg>
        </NuxtLink>
      </div>
      </div>     
    </div>
    

    
      <div class="py-5 flex gap-5 max-w-[750px] md:mx-auto">
        <div class="pl-[10%] text-right">
          <div class="flex items-center gap-1 pb-2 justify-end">
            <UIcon name="i-heroicons-cube" />
            <h2 class="font-bold text-[#008F78]">Build Your Perfect Deck</h2>
          </div>
      
          <div class="md:flex gap-2 flex-row-reverse ">
            <p class="font-[yugioh]">Unleash your inner strategist and construct your dream deck with ease. Our intuitive deck-building tools empower you to create unstoppable combinations and reign supreme in every duel.</p>
            <NuxtLink :to="`card/Red-Eyes Black Dragon`">
              <NuxtImg src="/redEyes.webp" class="max-w-[300px] max-h-[300px] mx-auto" ></NuxtImg>
            </NuxtLink>
          </div>
        </div>
        
      </div>
    
    
    
    <div class="py-5 pr-[10%] max-w-[750px] md:mx-auto ">
      <div class="flex items-center gap-1 pb-2">
        <UIcon name="i-heroicons-users" />
        <h2 class="font-bold text-[#2D61AF]">Connect with Fellow Duelists</h2>
      </div>
      
      <div class="md:flex gap-2">
        <p class="font-[yugioh] pb-2">Forge alliances, challenge rivals, and make new friends within our vibrant community of Yu-Gi-Oh enthusiasts. Dive into the world of dueling and connect with like-minded players to exchange tips, tricks, and strategies.</p>
        <NuxtLink :to="`card/Dark Magician`">
          <NuxtImg src="/darkmagician.png" class="max-w-[250px] max-h-[250px] mx-auto" ></NuxtImg>
        </NuxtLink>
      </div>
    </div>
    
    <div class="py-5 pl-[10%] text-right max-w-[750px] md:mx-auto">
      <div class="flex items-center gap-1 pb-2 justify-end">
        <UIcon name="i-heroicons-document" />
        <h2 class="font-bold text-[#008F78]">Stay in Control with Your cards</h2>
      </div>
      
      <div class="md:flex flex-row-reverse gap-2">
        <p class="font-[yugioh] pb-2">Keep your most cherished cards close at hand by adding them to your favorites. Never lose track of the cards that define your winning strategy and personal style.</p>
        <NuxtLink :to="`card/Holactie the Creator of Light`">
          <NuxtImg src="/CreatorofLight.webp" class="max-w-[250px] max-h-[250px] mx-auto" ></NuxtImg>
        </NuxtLink>
      </div>
    </div>
    

  </UContainer>

  <div class="flex justify-center gap-5 pt-12">
    <NuxtLink to="/registerPage">
      <button v-if="!user">Create and Account</button>
    </NuxtLink>
    <NuxtLink to="/loginPage">
      <button v-if="!user">Login</button>
    </NuxtLink>
  </div>

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
