<script setup lang="ts">
const maxLength = usePagesLength();
const currentPage = useCurrentPage();

const goToFirstPage = () => {
  currentPage.value = 1;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (currentPage.value < maxLength.value) {
    currentPage.value++;
    console.log(maxLength.value);
  }
};

const goToLastPage = () => {
  currentPage.value = maxLength.value;
};
</script>

<template>
  <section class="w-[90%] mx-auto flex justify-center items-center gap-5 pt-5">
    <div
      @click="goToFirstPage"
      class="border border-gray-400 w-fit h-fit px-3 py-1 rounded-3xl max-w-[58px] max-h-[42px] flex justify-center items-center"
    >
      <NuxtImg src="/firstPage.png" class="h-full w-full" />
    </div>
    <div
      @click="goToPreviousPage"
      class="border border-gray-400 w-fit h-fit px-3 py-1 rounded-3xl max-w-[58px] max-h-[42px] flex justify-center items-center"
    >
      <NuxtImg src="/previousPage.png" />
    </div>
    <div
      class="border border-gray-400 w-fit h-fit rounded-3xl max-w-[58px] max-h-[42px] px-5 py-1 flex justify-center items-center"
    >
      {{ currentPage }}
    </div>
    <div
      @click="goToNextPage"
      class="border border-gray-400 w-fit h-fit px-3 py-1 rounded-3xl max-w-[58px] max-h-[42px] flex justify-center items-center"
    >
      <NuxtImg src="/nextPage.png" />
    </div>
    <div
      @click="goToLastPage"
      class="border border-gray-400 w-fit h-fit px-3 py-1 rounded-3xl max-w-[58px] max-h-[42px] flex justify-center items-center"
    >
      <NuxtImg src="/lastPage.png" />
    </div>
  </section>
</template>
