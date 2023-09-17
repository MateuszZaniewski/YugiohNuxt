<script setup>

const menuOpen = ref(false);
const openAndCloseMenu = () => {
    menuOpen.value = !menuOpen.value
};

const openedMenu = '/hamburger.png';
const closedMenu = '/close.png';

</script>


<template>

    <nav class="h-[20.833vw] bg-[#D9D9D9] max-h-[100px] flex justify-between items-center md:justify-center md:gap-14 lg:justify-center">
        <div class=" flex md:justify-around md:w-[100%]">
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6]">My Account</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6]">Search Cards</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6]">Deck Builder</span>
        </div>
        
        <NuxtImg src="/user.png" class=" w-9 h-9 md:hidden" />
        <span class=" text-3xl md:w-[33%] text-center">Yu-Gi-OH</span>
        <NuxtImg :src="menuOpen ? openedMenu : closedMenu" class=" w-9 h-9 md:hidden" @click="openAndCloseMenu"/>
        <div class=" flex md:justify-around md:w-[100%]">
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6]">Favourites</span>
            <span class="hidden md:block md:text-lg hover:text-[#9B59B6]">Login/SignIn</span>
        </div>
        
    </nav>

</template>


<style scoped>


</style>