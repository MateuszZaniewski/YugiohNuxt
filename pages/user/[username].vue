<script setup>
const route = useRoute();
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser

const { getFavouriteCards, addFavouriteCard, fetchAllUsersm, addFriend, removeFriend } =
  useFirestoreUtils();
const fetchedFavouriteCards = ref([]);

const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(route.params.username);
    fetchedFavouriteCards.value = favorites;
  } catch (error) {
    console.error(error);
  }
};

const removeUserFromFriends = async (userId, friendName) => {
    try {
        removeFriend(userId, friendName)
    } catch (error) {
        console.log(error)
    }
}

const addUserToFriend = async (userId, friendName) => {
    try {
        addFriend(userId, friendName )
        console.log('User', friendName, 'added.')
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
  fetchFavoriteCards();
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

  <div class="flex gap-1">
    <h1>Username :</h1>
    <span>{{ route.params.username }}</span>
  </div>

  <section class="favourites max-w-2xl mx-auto py-4">
    <h2 class="pb-2">Favourite Cards : {{ fetchedFavouriteCards.length }}</h2>
    <div class="flex flex-col gap-5 w-[90%] mx-auto">
      <div
        v-for="fav in fetchedFavouriteCards"
        :key="fav"
        class="px-4 py-2 bg-[#cbd5e1] rounded-xl"
      >
        <NuxtLink :to="`/card/${fav.card}`">
          <span class="text-xl">{{ fav.card }}</span>
        </NuxtLink>
      </div>
    </div>

    <div>
      <p>Add {{ route.params.username }} to friends!</p>
      <UButton @click="addUserToFriend(user.email, route.params.username)" class="text-xs px-1 py-1 roundex-3xl bg-[rgba(134,144,158,0.7)]">Add</UButton>
    </div>

    <div>
      <p>Remove {{ route.params.username }} to friends!</p>
      <UButton @click="removeUserFromFriends(user.email, route.params.username)" class="text-xs px-1 py-1 roundex-3xl bg-[rgba(134,144,158,0.7)]">Remove</UButton>
    </div>
  </section>
</template>

<style scoped></style>
