<script setup lang="ts">

let galleryActive = ref(true);

</script>


<template>

<Navbar />

<section class="searchBar w-[90%] mx-auto pt-5 flex items-center">
    <input type="search" placeholder="Search" class="search border-2 h-11 w-[80%] mx-auto rounded-l-3xl rounded-bl-3xl pl-[10%] text-base border-[#2D61AF]">
    <button class="h-11 w-[20%] border-2 rounded-r-3xl rounded-br-3xl border-[#2D61AF] bg-[url('/glass.png')] bg-no-repeat bg-[#2D61AF] bg-center"></button>
</section>

<div class=" pt-5 w-[90%] mx-auto flex justify-between items-center">
    <div class="flex justify-center w-28 border-2 rounded-3xl border-black py-1 px-1">
        <NuxtImg src="/filter.png" height="20" width="20" />
        <span>Filters</span>
    </div>

    <div>
        <div class="flex gap-5 items-center">
            <NuxtImg height="30" width='30' :src="galleryActive ? '/galleryActive.png' : '/galleryInactive.png'" />
            <NuxtImg height="30" width="30" :src="galleryActive ? '/listInactive.png' : '/listActive.png'"/>
        </div>
    </div>
</div>


<Cards />


</template>



<style scoped>

.glass {
    background-image: url('../public/glass.png');
}

input::-webkit-search-cancel-button {
        padding-right: 10%;
    }


</style>