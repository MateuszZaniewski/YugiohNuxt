<script setup lang="ts">

const activePage = ref(1);
const emits = defineEmits(['page-change']);

const goToFirstPage = () => {
  activePage.value = 1;
  emits('page-change', activePage.value);
};

const goToPreviousPage = () => {
    activePage.value--;
  emits('page-change', activePage.value);
};

const goToNextPage = () => {
  
  emits('page-change', activePage.value);
};

const goToLastPage = () => {
  
  emits('page-change', activePage.value);
};


watch(
  () => activePage,
  (newValue) => {
    emits('page-change', activePage.value); // Emit the event with the new page value
  }
);

</script>

<template>
  <section class="w-[90%] mx-auto flex justify-center gap-5 pt-5">
    <div @click="goToFirstPage" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/firstPage.png" />
    </div>
    <div @click="goToPreviousPage" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/previousPage.png" />
    </div>
    <div class="border border-gray-400 px-5 py-2 rounded-3xl">
      {{ activePage }}
    </div>
    <div @click="goToNextPage" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/nextPage.png" />
    </div>
    <div @click="goToLastPage" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/lastPage.png" />
    </div>
  </section>
</template>

<style scoped></style>
