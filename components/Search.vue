<script setup>

const searchText = ref('');

</script>


<template>

<section class="searchBar">
    <input v-model="searchText" type="search" placeholder="Search" class="search">
</section>

</template>


<style scoped>

input::-webkit-search-cancel-button {
        padding-right: 10%;
    }

</style>