<script setup>
const route = useRoute();
const { getFavouriteCards, addFriend, removeFriend, loadCurrentUser, getDesiredUserData, grabUser } = useFirestoreUtils();

console.log(route.params.username)

const user = ref();
const fetchedFavouriteCards = ref([]);
const userData = ref();
const decks = ref([]);
const currentUser = ref()



const removeUserFromFriends = async (email, friendName, image) => {
    try {
        removeFriend(email, friendName, image)
    } catch (error) {
        console.log(error)
    }
}

const addUserToFriend = async (email, friendName, image) => {
    try {
        addFriend(email, friendName, image )
        console.log('User', friendName, 'added.')
    } catch (error) {
        console.log(error)
    }
}



const desiredUserFunction = async () => {
  try {
    const data = await loadCurrentUser(); // GoogleUser credentials
    console.log('User', data)
    user.value = data

    const current = await getDesiredUserData(user.value.email)
    currentUser.value = current
    console.log(currentUser.value.friends)

    const userD = await grabUser(route.params.username);
    userData.value = userD
    console.log(userData.value)

    const favourites = await getFavouriteCards(userData.value.email);
    fetchedFavouriteCards.value = favourites
    console.log(fetchedFavouriteCards.value)

    

  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await desiredUserFunction();
});

</script>

<template>

  <div class="text-center pt-6 text-xs">
        <span>User Profile</span>
  </div>


  <div class="flex justify-start w-full pt-4 pl-6">
    <NuxtImg
      src="/backArrowBlack.png"
      height="30px"
      width="30px"
      @click="$router.go(-1)"
    />
  </div>

    <section v-if="userData" class="flex pt-7 gap-3 justify-start w-[90%] mx-auto max-w-xl">
        <div class="flex justify-center w-fit">
            <NuxtImg :src="userData.image" height="60px" width="60px" class="rounded-full w-full"/>
        </div>
        <div class="flex flex-col w-[60%] justify-end">
            <span class="w-fit font-bold">{{ userData.name }}</span>
            <span class="text-xs italic">{{ userData.email }}</span>
        </div>
        
    </section>
    <section class="flex pt-3 gap-3 justify-start w-[90%] mx-auto max-w-xl">
      <div class="flex justify-center gap-3">
            <UButton @click="addUserToFriend(user.email, userData.email, userData.name)" class="text-xs px-1 py-1 roundex-3xl bg-[rgba(45,97,175,0.7)]">Add to friends</UButton>
            <UButton @click="addUserToFriend(user.email, userData.email, userData.name)" class="text-xs px-1 py-1 roundex-3xl bg-[rgba(45,97,175,0.7)]">Remove from friends</UButton>
      </div>
    </section>

  <section class="favourites max-w-2xl mx-auto py-4">
    <section class="pt-8 w-[90%] mx-auto max-w-xl">
        <div>
            <div class="flex justify-start mx-auto">
                <div class="flex gap-1 items-center w-[90%] mx-auto">
                    <UIcon  name="i-heroicons-heart" />
                    <UBadge :label="`Favourite cards (${fetchedFavouriteCards.length})`" class="px-0 w-full text-sm bg-transparent text-[#A25772] font-bold" />
                </div>
            </div>
            <div v-if="fetchedFavouriteCards.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex gap-5 pl-5 pr-2 items-center overflow-scroll overflow-y-hidden bg-blue-100">
                    <div  v-for="fav in fetchedFavouriteCards" :key="fav" class="w-fit py-7">
                        <NuxtLink :to="`/card/${fav.card}`">
                            <NuxtImg :src="fav.image" class="rounded-sm max-w-[150px] h-[100px] w-[64px] lg:h-[160px] lg:w-[108px]"  />
                        </NuxtLink>
                    </div>
            </div>

            <div v-if="fetchedFavouriteCards.length == 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto min-h-[170px] flex flex-col text-[rgba(0,0,0,0.5)] gap-1 pl-5 pr-2 items-center justify-center bg-blue-100">
                <span>User favorites list is currently empty.</span>
            </div>



        </div>
    </section>

    <section class=" py-8 w-[90%] mx-auto max-w-xl">
        <div class="flex gap-1 items-center w-[90%] mx-auto">
            <UIcon name="i-heroicons-puzzle-piece" />
            <UBadge :label="`Decks (${decks.length})`" class="px-0 text-sm bg-transparent text-[#A25772] font-bold" />
        </div>
        <div v-if="decks.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex gap-5 pl-5 pr-2 items-center h-44 bg-blue-100">
            
        </div>
        <div v-if="decks.length == 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto min-h-[170px] flex flex-col text-[rgba(0,0,0,0.5)] gap-1 pl-5 pr-2 items-center justify-center bg-blue-100">
                <span class="text-center">User has no decks build yet.</span>
            </div>
    </section>
  </section>
</template>

