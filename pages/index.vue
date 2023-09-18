<script setup>

</script>


<template>

    <Navbar />
    <div class="w-[90%] mx-auto">
        <h1 class=" text-3xl text-center pt-7">Welcome to Your Ultimate Yu-Gi-Oh Fan Destination</h1>

        <p class=" text-base text-center pt-10">Explore card searches, Craft decks, Share strategies, and cherish Your favorites cards</p>
    </div>

    <div class="flex justify-center gap-5 pt-12">
        <Button class="bg-[#3498DB] text-base" text="Create an Account"/>
        <Button class="bg-[#9B59B6] text-base" text="Login"/>
    </div>
    
    <div class=" pt-20 flex justify-center flex-col items-center gap-5">
        <NuxtImg class=" cursor-pointer" src="Cards.png" height="135" width="150"/>
        <NuxtImg src="arrowUp.png" height="54" width="54" />
    </div>

    <p class=" pt-5 text-center">Click on cards to see what’s Your lucky Card</p>
    

</template>


<style scoped>


</style>