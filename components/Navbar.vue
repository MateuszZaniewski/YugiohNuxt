<script setup lang="ts">
import { signOut, onAuthStateChanged } from 'firebase/auth';

const currentUser = ref()
const menuOpen = ref(false);
const { auth } = useFirebase();
const links = [
  "My Account",
  "Search Cards",
  "Deck Builder",
  "Favourites",
  "Login/SignIn",
];
const adress = ["", "/searchPage", "", "", "/loginPage"];

const logoutCurrentUser = () => {
  if(currentUser.value) {
    signOut(auth).then(() => {
      console.log('User sign out')
      currentUser.value = null
      window.location.reload()
  }).catch((error) => {
      console.log(error)
});
  } else {
    currentUser.value = currentUser.value
    console.log('Brak użytkownika do wylogowania')
  }
}

const openAndCloseMenu = () => {
  menuOpen.value = !menuOpen.value;
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user
    console.log(user.email)
  } else {
    currentUser.value = null
  }
});
});
</script>

<template>
  <nav
    class="h-[20.833vw] bg-[#2D61AF] max-h-[100px] flex justify-between items-center md:justify-center md:gap-14 lg:justify-center text-white"
  >
    <div class="flex md:justify-around md:w-[100%]">
      <NuxtLink
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

    <div>
      <NuxtLink to="/userProfile">
        <NuxtImg  src='/user.png' class="w-9 h-9 md:hidden" />
      </NuxtLink>
      <!-- @click="logoutCurrentUser" -->
      
    </div>
    
      <NuxtLink to="/" class="text-3xl md:w-[33%] text-center cursor-pointer"
      >Yu-Gi-OH
      </NuxtLink>
    
    <div>
      <NuxtImg
      :src="menuOpen ? '/close.png' : '/hamburger.png'"
      class="w-6 h-6 md:hidden"
      @click="openAndCloseMenu"
      />
    </div>
    
    
    
    <div class="flex md:justify-around md:w-[100%]">
      <NuxtLink
        class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
        >Favourites</NuxtLink
      >
      <NuxtLink
        class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
        to="/loginPage"
        >Login/SignIn</NuxtLink
      >
    </div>

    <nav
      :class="menuOpen ? 'block' : 'hidden'"
      class="w-[100vw] absolute top-[20.833vw] left-0 bg-inherit pb-5"
    >
      <ul class="flex flex-col">
        <NuxtLink
          class="pt-5 pl-5 hover:text-[#9B59B6] text-white"
          v-for="(link, index) in links"
          :key="link"
          :to="adress[index]"
        >
          {{ link }}
        </NuxtLink>
      </ul>
    </nav>
  </nav>
</template>

<style scoped></style>
