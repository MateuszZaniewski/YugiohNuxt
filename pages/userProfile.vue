<script setup>

const { getFavouriteCards, getDesiredUserData, fetchFriends, fetchAllUsers } = useFirestoreUtils()
const fetchedFavouriteCards = ref([]);
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser
const currentUser = ref([])
const allUsers = ref([])
const friendsActive = ref(true)
const friendUsers = ref([])
const isOpenFriends = ref(false)
const selected = ref([])
const router = useRouter()
const decks = ref([])
const avatar = ref('')



const groups = ref([]);
watchEffect(() => {
  if (allUsers.value) {
    groups.value = [{
      key: 'label',
      commands: allUsers.value,
      filter: (q, commands) => {
        if (!q) {
          return commands?.filter(command => !command.child)
        }
        return commands
      }
    }];
  }
});

function onSelect(option){
    router.push(`user/${option.label}`)
}



const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(user.email);
    fetchedFavouriteCards.value = favorites;
  } catch (error) {
    console.error(error);
  }
};

const fetchUsers = async () => {
    try {
        const users = await fetchAllUsers(user.email, user.displayName)
        allUsers.value = users

        const current = await getDesiredUserData(user.displayName)
        currentUser.value = current
        console.log(current[0])
        console.log(allUsers)
    } catch (error) {
        console.log(error)
    }
}

const fetchFriend = async () => {
    try {
        const friends = await fetchFriends(user.email)
        friendUsers.value = friends
        console.log(friendUsers)
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
  await fetchFavoriteCards()
  await fetchUsers()
  await fetchFriend()
   
});

</script>

<template>


<!-- ///////////////////////////////// USERS SECTION /////////////////////////////////////////////////// -->

    <div class="text-center pt-6 text-xs">
        <span>User Profile</span>
    </div>

    <div class="flex justify-between w-[90%] mx-auto">
        <NuxtImg @click="$router.go(-1)" src="/backArrowBlack.png" height="30px" width="30px"/>
        <UButton @click="logoutUser()" icon="i-heroicons-arrow-left-on-rectangle" class="text-xs px-2 py-0 roundex-3xl bg-[rgba(134,144,158,0.7)]">Logout</UButton>
    </div>
    
    
    <section class="flex pt-7 gap-3 justify-between w-[90%] mx-auto max-w-xl">
        <div class="w-fit flex justify-center">
            <NuxtImg :src="user.photoURL ? user.photoURL : '/userTemplate.jpg'" height="60px" width="60px" class="rounded-full"/>
        </div>
        <div class="flex flex-col w-[60%] justify-end">
            <span class="w-fit font-bold">Mateusz Mati</span>
            <span class="text-xs italic">mateusz.kokoszka111@gmail.com</span>
        </div>
        <div class="flex items-end mr-2">
            <UButton class="text-xs px-1 py-1 roundex-3xl bg-[rgba(45,97,175,0.7)]">Edit profile</UButton>
            
        </div>
    </section>


<!-- ///////////////////////////////// FAVOURITES SECTION ///////////////////////////////////////////////// -->


<div>
    <section class="pt-8 w-[90%] mx-auto max-w-xl">
        <div>
            <div class="flex justify-between w-[90%] mx-auto">
                <div class="flex gap-1 items-center w-[90%] mx-auto">
                    <UIcon  name="i-heroicons-heart" />
                    <UBadge :label="`Favourite cards (${fetchedFavouriteCards.length})`" class="px-0 w-full text-sm bg-transparent text-[#A25772] font-bold" />
                </div>
                <div class="w-2/6 flex justify-end">
                    <NuxtLink :to="`/favourites`">
                        <UButton label="Show more" class="border shadow-none border-transparent bg-transparent text-[rgba(0,0,0,0.8)] px-0 py-0 text-sm font-bold" />
                    </NuxtLink>
                </div>
            </div>
            <div v-if="fetchedFavouriteCards.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex gap-5 pl-5 pr-2 items-center overflow-scroll overflow-y-hidden bg-blue-100">
                    <div  v-for="fav in fetchedFavouriteCards.slice(0,10)" :key="fav" class="w-fit py-7">
                        <NuxtLink :to="`card/${fav.card}`">
                            <NuxtImg :src="fav.image" class="rounded-sm max-w-[150px] h-[100px] w-[64px] lg:h-[160px] lg:w-[108px]"  />
                        </NuxtLink>
                    </div>
                    <NuxtLink :to="`/favourites`">
                        <UButton v-if="fetchedFavouriteCards.length > 10" icon="i-heroicons-forward" class="border shadow-none border-transparent bg-transparent text-[rgba(0,0,0,0.8)] px-0 py-0 text-s font-bold" />
                    </NuxtLink>
            </div>

            <div v-if="fetchedFavouriteCards.length == 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto min-h-[170px] flex flex-col text-[rgba(0,0,0,0.5)] gap-1 pl-5 pr-2 items-center justify-center bg-blue-100">
                <span>Your favorites list is currently empty.</span>
                    <span>Feel free to add some cards.</span>
            </div>



        </div>
    </section>

<!-- ///////////////////////////////// FRIENDS SECTION /////////////////////////////////////////////////// -->


    <section class=" pt-8 w-[90%] mx-auto max-w-xl">
        <div class="flex justify-between w-[90%] mx-auto">
            <div class="flex gap-1 items-center">
                <UIcon name="i-heroicons-users" />
                <UBadge :label="`Friends (${friendUsers.length})`" class="px-0 text-sm bg-transparent text-[#A25772] font-bold" />
            </div>
            <div>
                <UButton label="Search" @click="isOpenFriends = true" class="border shadow-none border-transparent bg-transparent text-[rgba(0,0,0,0.8)] px-0 py-0 text-sm font-bold" />

                <UModal v-model="isOpenFriends">
                    <UCommandPalette
                    v-model="selected"
                    :autoselect="false"
                    :groups="groups"
                    :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
                    @update:model-value="onSelect" 
                    />
                </UModal>

            </div>
        </div>
        <div v-if="friendUsers.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex items-center h-44 bg-blue-100">
            <div class="w-11/12 mx-auto h-full pt-4">
                <div v-for="friend in friendUsers" :key="friend">
                    <NuxtLink :to="`user/${friend.name}`">
                        <div class="flex items-center justify-left gap-2 pl-2 pb-3">
                            <div class="rounded-full h-9 w-9 flex items-center">
                                <NuxtImg :src="friend.image" class=" h-9 w-9 object-contain" />
                            </div>
                            <p class="text-md">{{ friend.name }}</p>
                            <span> {{ friend.email }}</span>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-if="friendUsers.length === 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex flex-col justify-center items-center h-44 bg-blue-100 text-[rgba(0,0,0,0.5)]">
            <span class="text-center">It seems that You have no friends yet.</span>
            <span class="text-center">Let's try to find some</span>
        </div>

    </section>


<!-- ///////////////////////////////// DECKS SECTION /////////////////////////////////////////////////// -->


    <section class=" py-8 w-[90%] mx-auto max-w-xl">
        <div class="flex gap-1 items-center w-[90%] mx-auto">
            <UIcon name="i-heroicons-puzzle-piece" />
            <UBadge :label="`Decks (${decks.length})`" class="px-0 text-sm bg-transparent text-[#A25772] font-bold" />
        </div>
        <div v-if="decks.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex gap-5 pl-5 pr-2 items-center h-44 bg-blue-100">
            
        </div>
        <div v-if="decks.length == 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto min-h-[170px] flex flex-col text-[rgba(0,0,0,0.5)] gap-1 pl-5 pr-2 items-center justify-center bg-blue-100">
                <span class="text-center">Meet the deck on a coffee break soon to host</span>
                    <span class="text-center">legendary cards even unicorns envy!</span>
            </div>
    </section>
</div>

</template>