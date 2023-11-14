<script setup lang="ts">
import type { _right } from "#tailwind-config/theme/backgroundPosition";
import { signOut, onAuthStateChanged } from "firebase/auth";
const isOpen = ref(false)
const currentUser = ref();
const menuOpen = ref(false);
const lightMode = ref(true)

const links = [
{
  label: 'Home',
  to: '/',
  icon: 'i-heroicons-home'
},
{
  label: 'My Account',
  to: '/userProfile',
  icon: 'i-heroicons-user-circle',
},
{
  label: 'Search Cards',
  to: '/searchPage',
  icon: 'i-heroicons-magnifying-glass-circle',
},
{
  label: 'Deck Builder',
  to: '/deckBuilder',
  icon: 'i-heroicons-puzzle-piece',
},
{
  label: 'Favourites',
  to: '/favourites',
  icon: 'i-heroicons-star',
},
];

const secondLinks = [
{
  label: 'Login/SignIn',
  to: '/loginPage',
  icon: 'i-heroicons-sparkles',
}
];

const modeLink = [
{
  label: 'Light Mode',
  icon:  'i-heroicons-sun'
},
{
  label: 'Dark Mode',
  icon:  'i-heroicons-moon'
}
]

</script>

<template>
  <nav
    class="h-[15vw] bg-[#2D61AF] max-h-[80px] align-middle"
  >
  <div class="max-w-7xl h-full flex pl-[5vw] md:pl-0 items-center md:justify-around md:gap-6 text-white mx-auto">
    <NuxtLink to="/" class="text-2xl md:w-fit text-center cursor-pointer font-[yugioh] md:pl-4 lg:pl-0 md:text-left "
      >Yu-Gi-OH
    </NuxtLink>
      <div class="flex md:justify-between md:w-fit md:gap-6">
        <NuxtLink
          to="/userProfile"
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          >My Account</NuxtLink
        >
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/searchPage"
          >Search Cards</NuxtLink
        >
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          >Deck Builder</NuxtLink
        >
      </div>
  
  
      
      
      
      
    <div class="absolute right-[5vw]">
      <div>
        <NuxtImg
          src="/hamburger.png"
          class="w-6 h-6 md:hidden"
          @click="isOpen = true"
        />
  
        <div class="flex flex-col flex-1">
          <USlideover v-model="isOpen" :overlay="true" class="w-[50%] left-auto" :side="'right'" >
            <div class="pt-8 pl-4 flex">
              <UVerticalNavigation :links="links" class="flex flex-col gap-2">
              <template #default="{ link }">
                <div>
                  <span class="group-hover:text-primary relative font-[yugioh]">{{ link.label }}</span>
                </div>
              </template>
            </UVerticalNavigation>
            </div>
            <div class="pb-2 pl-4 mt-auto">
              <UVerticalNavigation :links="secondLinks" class="flex flex-col gap-2">
              <template #default="{ link }">
                <div>
                  <span class="group-hover:text-primary relative font-[yugioh]">{{ link.label }}</span>
                </div>
              </template>
            </UVerticalNavigation>
            </div>
            <div class="pb-8 pl-4">
              <UVerticalNavigation :links="modeLink" class="flex flex-col gap-2">
              <template #default="{ link }">
                <div v-if="link.label === 'Light Mode'">
                  <span class="group-hover:text-primary relative font-[yugioh]">{{ link.label }}</span>
                </div>
              </template>
            </UVerticalNavigation>
            </div>
          </USlideover>
        </div>
  
      </div>
    </div>
  
  
  
  
  
      <div class="flex md:justify-around md:w-fit md:gap-6">
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/favourites"
          >Favourites</NuxtLink
        >
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/loginPage"
          >Login/SignIn</NuxtLink
        >
      </div>
  </div>
  </nav>


  

</template>
