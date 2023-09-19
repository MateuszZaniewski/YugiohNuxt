<script setup>


</script>


<template>
<Navbar />
<div class="flex pl-5 pt-5 gap-1">
    <NuxtImg class="" src="/backArrow.png"/>
    <NuxtLink to="/">Back</NuxtLink>
</div>

<h1 class="text-4xl mx-auto text-center">Yu-Gi-OH</h1>

<div class="flex justify-center flex-col w-[90%] mx-auto">
    <input placeholder="EMAIL" class=" border-2" />
    <input placeholder="PASSWORD" class=" border-2" />
    <button class="border-2">Log in</button>
</div>

<div class="flex justify-center flex-col w-[90%] mx-auto">
    <button class="google border-2 ">Continue with Google</button>
    <button class="facebook border-2">Continue with Facebook</button>
    <p class="text-center">Forgot password?</p>
</div>

<div class="flex justify-center">
    <button class="w-[90%] border-2">Create new Account</button>
</div>


</template>


<style scoped>

.google {
    background-image: url('../public/google.png');
    background-repeat: no-repeat;
}

.facebook {
    background-image: url('../public/facebook.png');
    background-repeat: no-repeat;
}

</style>