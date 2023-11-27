<script setup>
const router = useRouter()
const { getFavouriteCards, fetchFriends, loadCurrentUser, fetchAllUsers, getDesiredUserData} = useFirestoreUtils()

const user = ref() // contains user credentials
const fetchedFavouriteCards = ref([]); // contains user favourite cards
const allUsers = ref() // contains all users from firebase exept current user
const friendUsers = ref([]) // contains user friends array
const decks = ref([]) // contains in the future user decks
const displayedUser = ref(); // actual displayed user


// Conditionals
const isOpenFriends = ref(false)
const editProfile = ref(false)
const selected = ref([])


const groups = ref([]);
watchEffect(() => {
  if (allUsers.value) {
    groups.value = [{
      key: 'name',
      commands: Object.keys(allUsers.value).map(userId => ({
        label: allUsers.value[userId].name,
        value: allUsers.value[userId],
      })),
      filter: (q, commands) => {
        if (!q) {
          return commands?.filter(command => !command.child);
        }
        return commands;
      },
    }];
  }
});

function onSelect(option){
    router.push(`user/${option.label}`)
}


const loadUserDataFavCardsAndFriends = async () => {
    try {
        const data = await loadCurrentUser(); // GoogleUser credentials
        user.value = data

        const favourites = await getFavouriteCards(user.value.email);
        fetchedFavouriteCards.value = favourites;

        const friends = await fetchFriends(user.value.email)
        friendUsers.value = friends

        const users = await fetchAllUsers(user.value.email)
        allUsers.value = users

        const cup = await getDesiredUserData(user.value.email);
        displayedUser.value = cup
        
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
  await loadUserDataFavCardsAndFriends()

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
    
    
    <section v-if="displayedUser" class="flex pt-7 gap-3 justify-between w-[90%] mx-auto max-w-xl">
        <div class="flex justify-center w-fit">
            <NuxtImg :src="displayedUser.image" height="60px" width="60px" class="rounded-full w-full"/>
        </div>
        <div class="flex flex-col w-[60%] justify-end">
            <span class="w-fit font-bold">{{ displayedUser.name }}</span>
            <span class="text-xs italic">{{ displayedUser.email }}</span>
        </div>
        <div class="flex items-end mr-2">
            <UButton @click="editProfile = !editProfile" class="text-xs px-1 py-1 roundex-3xl bg-[rgba(45,97,175,0.7)]">Edit profile</UButton>
            
        </div>
    </section>


<!-- ///////////////////////////////// SETTINGS SECTION ///////////////////////////////////////////////// -->


<settings v-if="editProfile && user" :user="displayedUser" />


<!-- ///////////////////////////////// FAVOURITES SECTION ///////////////////////////////////////////////// -->


<div v-if="!editProfile">
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
                    :fuse="{ resultLimit: 3, fuseOptions: { threshold: 0.1 } }"
                    @update:model-value="onSelect" 
                    />
                </UModal>

            </div>
        </div>
        <div v-if="friendUsers.length > 0" class="rounded-xl border border-blue-200 w-[90%] mx-auto flex items-center h-44 bg-blue-100 overflow-scroll overflow-x-hidden">
            <div class="w-11/12 mx-auto h-full pt-4">
                <div v-for="friend in friendUsers" :key="friend">
                    <NuxtLink :to="`user/${friend.name}`">
                        <div class="flex items-center justify-left gap-2 pl-2 pb-3">
                            <div class="rounded-full h-9 w-9 flex items-center">
                                <NuxtImg :src="friend.image" class=" h-9 w-9 object-contain" />
                            </div>
                            <p class="text-md">{{ friend.name }}</p>
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