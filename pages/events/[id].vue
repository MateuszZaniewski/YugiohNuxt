<template>

<div>
    This route id is : {{  $route.params.id }}
</div>

</template>

<script setup>

const route = useRoute()
const nuxt = useNuxtApp()

console.log(nuxt)

console.log(route.params.id)

</script>