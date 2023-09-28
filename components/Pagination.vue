<script setup lang="ts">
const props = defineProps({
  activePage: Number,
  cardsLimit: Number,
  pagesLength: Number,
});

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();

const pagesLength = ref(null);
const startPoint = ref(0);
const currentPage = ref(10);
const activePage = ref(1);
</script>

<template>
  <section class="w-[90%] mx-auto flex justify-center gap-5 pt-5">
    <div @click="" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/firstPage.png" />
    </div>
    <div @click="" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/previousPage.png" />
    </div>
    <div class="border border-gray-400 px-5 py-2 rounded-3xl">
      {{ activePage }}
    </div>
    <div @click="" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/nextPage.png" />
    </div>
    <div @click="" class="border border-gray-400 px-5 py-2 rounded-3xl">
      <NuxtImg src="/lastPage.png" />
    </div>
  </section>
</template>

<style scoped></style>
