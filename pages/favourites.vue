<script setup>
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser;
const fetchedFavouriteCards = ref([]);

const { getFavouriteCards } = useFirestoreUtils();

const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(user.email);
    fetchedFavouriteCards.value = favorites;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    fetchFavoriteCards();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="flex justify-start w-full pt-4 pl-6">
    <NuxtImg
      src="/backArrowBlack.png"
      height="30px"
      width="30px"
      @click="$router.go(-1)"
    />
  </div>

  <h1 class="text-center py-5 text-2xl">Your favourite cards</h1>

  <section class="flex flex-wrap gap-5 justify-center max-w-[1400px]">
    <div
      class="flex flex-wrap justify-center gap-6 mx-auto w-[90%] max-w-3xl lg:w-[50vw]"
    >
      <div
        v-for="card in fetchedFavouriteCards"
        :key="card.id"
        class="justify-center w-fit mx-auto"
      >
        <NuxtLink
          :src="card.image"
          class="h-[200px] w-[140px]"
          :to="`card/${card.card}`"
        >
          <!-- rework this :class to hide it -->
          <NuxtImg :src="card.image" class="h-[200px] w-[140px]" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
