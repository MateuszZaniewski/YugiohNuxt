<script setup>


const menuOpen = ref(false);
const openAndCloseMenu = () => {
    menuOpen.value = !menuOpen.value
};

const links = ['My Account','Search Cards','Deck Builder','Favourites','Login/SignIn'];

</script>


<template>

<nav class="h-[20.833vw] bg-[#2D61AF] max-h-[100px] flex justify-between items-center md:justify-center md:gap-14 lg:justify-center text-white">
        <div class=" flex md:justify-around md:w-[100%]">
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer">My Account</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer">Search Cards</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer">Deck Builder</span>
        </div>
        
        <NuxtImg src="/user.png" class=" w-9 h-9 md:hidden" />
        <span class=" text-3xl md:w-[33%] text-center">Yu-Gi-OH</span>
        <NuxtImg :src="menuOpen ? '/close.png' : '/hamburger.png'" class=" w-9 h-9 md:hidden" @click="openAndCloseMenu"/>
        <div class=" flex md:justify-around md:w-[100%]">
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer">Favourites</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer">Login/SignIn</span>
        </div>
        
        <nav :class="menuOpen ? 'block' : 'hidden'" class="w-[100vw] absolute top-[20.833vw] left-0 bg-inherit pb-5">
            <ul>
                <li class="pt-5 pl-5 hover:text-[#9B59B6] text-white" v-for="link in links" :key="link">
                    {{ link }}
                </li>
            </ul>
        </nav>


</nav>


</template>


<style scoped>


</style>