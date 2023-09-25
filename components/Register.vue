<script setup></script>

<template>
  <Navbar />
  <div class="flex pl-5 pt-5 gap-1">
    <NuxtImg class="" src="/backArrow.png" />
    <NuxtLink to="/">Back</NuxtLink>
  </div>

  <h1 class="text-4xl mx-auto text-center">Yu-Gi-OH</h1>

  <div class="flex justify-center flex-col w-[90%] mx-auto">
    <input placeholder="EMAIL" class="border-2" />
    <input placeholder="PASSWORD" class="border-2" />
    <button class="border-2">Create an Account</button>
  </div>

  <div class="flex justify-center flex-col w-[90%] mx-auto">
    <p class="text-center">Already have an account?</p>
  </div>

  <div class="flex justify-center">
    <button class="w-[90%] border-2">Sign in</button>
  </div>
</template>

<style scoped></style>
