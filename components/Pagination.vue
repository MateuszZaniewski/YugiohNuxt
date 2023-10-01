<script setup lang="ts">

const props = defineProps({
  startFrom: Number,
  endTo: Number,
  activePage: Number,
  maxPageLimit: Number,
  allCards : Array
})

const activePageRef = ref(props.activePage || 1)
let maxPageLimitRef = ref(props.maxPageLimit || 1056)


const emits = defineEmits(['page-change']);


const goToFirstPage = () => {
  activePageRef.value = 1
  emits('page-change', activePageRef.value, maxPageLimitRef.value);
};

const goToPreviousPage = () => {
  if(activePageRef.value > 1 ){
    activePageRef.value--
  }
  emits('page-change', activePageRef.value, maxPageLimitRef.value);
};

const goToNextPage = () => {
  if(activePageRef.value < maxPageLimitRef.value)
  activePageRef.value++
  emits('page-change', activePageRef.value, maxPageLimitRef.value);
  console.log(props.allCards)
};

const goToLastPage = () => {
  activePageRef.value = maxPageLimitRef.value
  emits('page-change', activePageRef.value, maxPageLimitRef.value);
};


watch(
  () => activePageRef.value, 
  (newValue) => {
    console.log(newValue)
    emits('page-change', activePageRef.value); // Emit the event with the new page value
  }
);

watch(
  () => maxPageLimitRef.value,
  (newValue) => {
    console.log(newValue),
    emits('page-change', maxPageLimitRef.value)
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
      {{ activePageRef }}
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
