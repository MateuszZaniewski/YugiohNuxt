<script setup>

const { getFavouriteCards, addFavouriteCard, addFriend, removeFriend, fetchFriends, fetchAllUsers } = useFirestoreUtils()
const fetchedFavouriteCards = ref([]);
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser
const allUsers = ref([])
const friendsActive = ref(true)
const friendUsers = ref([])
const isOpenFriends = ref(false)
const selected = ref([])
const router = useRouter()
const decks = ref([])



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
                        <div class="flex items-center justify-left gap-1 pl-2 pb-1">
                            <div class="rounded-full h-2 w-2 border border-white bg-green-600"></div>
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


    <!-- <section v-if="user" class=" max-w-3xl mx-auto">
        <div class="flex justify-center">
            <NuxtImg :src="user.photoURL ? user.photoURL : '/userTemplate.jpg'" height="100px" width="100px" class="rounded-full"/>
        </div>
        <div class="flex justify-center pt-5">
            <div>
                <span class="text-2xl">{{ user.displayName }}</span>
            </div>
        </div>
    </section>

    <section class="flex justify-around py-8 max-w-xl mx-auto">
        <div>
            <div @click="activeBox = 'favourites'" class="px-4 py-3 rounded-2xl" :class="activeBox === 'favourites' ? 'bg-[#2D61AF]' : 'bg-[#cbd5e1]'">
               <NuxtImg :src="activeBox === 'favourites' ? '/user/starWhite.svg' : '/user/starBlack.svg' " height="30px" width="30px" /> 
            </div>
        </div>
        <div>
            <div @click="activeBox = 'decks'" class="px-4 py-3 rounded-2xl" :class="activeBox === 'decks' ? 'bg-[#2D61AF]' : 'bg-[#cbd5e1]'">
               <NuxtImg :src="activeBox === 'decks' ? '/user/deckWhite.svg' : '/user/deckBlack.svg' " height="30px" width="30px" /> 
            </div>
        </div>
        <div>
            <div @click="activeBox = 'friends'" class="px-4 py-3 rounded-2xl" :class="activeBox === 'friends' ? 'bg-[#2D61AF]' : 'bg-[#cbd5e1]'">
               <NuxtImg :src="activeBox === 'friends' ? '/user/friendsWhite.svg' : '/user/friendsBlack.svg' " height="30px" width="30px" /> 
            </div>
        </div>
        <div>
            <div @click="activeBox = 'settings'" class="px-4 py-3 rounded-2xl" :class="activeBox === 'settings' ? 'bg-[#2D61AF]' : 'bg-[#cbd5e1]'">
               <NuxtImg :src="activeBox === 'settings' ? '/user/settingsWhite.svg' : '/user/settingsBlack.svg' " height="30px" width="30px" /> 
            </div>
        </div>
    </section>

    <section v-if="activeBox === 'favourites'" class="favourites max-w-2xl mx-auto">
        <div class="flex flex-col gap-5 w-[90%] mx-auto">
            <div v-for="fav in fetchedFavouriteCards" :key="fav" class="px-4 py-2 bg-[#cbd5e1] rounded-xl">
                <NuxtLink :to="`card/${fav.card}`">
                    <span class="text-xl">{{ fav.card }}</span>
                </NuxtLink>
            </div>
        </div>
    </section>

    <section v-if="activeBox === 'decks'" class="decks max-w-2xl mx-auto">
        <div class="flex flex-col gap-5 w-[90%] mx-auto">
            <div v-for="deck in decks" :key="deck" class="px-4 py-2 bg-[#cbd5e1] rounded-xl flex justify-between gap-6">
                <div class="w-[50%]">
                    <span class="text-xl">{{ deck }}</span>
                </div>
                <div class="w-[50%] flex items-center justify-between">
                    <NuxtImg src="/user/edit.svg" height="25px" width="25px" />
                    <NuxtImg src="/user/share.svg" height="25px" width="25px" />
                    <NuxtImg src="/user/goto.svg" height="25px" width="25px" />
                </div>
                    
                
            </div>
        </div>
    </section>

                

    <section v-if="activeBox === 'friends'" class="friends max-w-2xl mx-auto">

        <div class="flex justify-around">
            <div class="w-[50%] text-center py-4 rounded-t-xl" :class="friendsActive ? 'bg-slate-300' : 'bg-none'" @click="friendsActive = true">
                <span>Friends</span>
            </div>
            <div class="w-[50%] text-center py-4 rounded-t-xl" :class="!friendsActive ? 'bg-slate-300' : 'bg-none'" @click="friendsActive = false">
                <span>All users</span>
            </div>
        </div>

        <div v-if="!friendsActive" class="flex justify-around pb-2 bg-slate-300">
            <div class="flex flex-row flex-wrap justify-center gap-5 w-[90%] mx-auto mt-5">
            <div v-for="friend in allUsers" :key="friend" class="flex flex-row items-center text-center">
                <div class="flex justify-center flex-col items-center">
                    <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl w-28 h-fit">
                        <NuxtLink :to="`user/${user}`" >
                            <NuxtImg src="/userTemplate.jpg" />
                        </NuxtLink>
                        
                    </div>
                        <button>{{ friend }}</button>    
                </div>
                <div class="flex flex-col gap-2">
                    <span @click="addUserToFriend(user.email, friend)">Add</span>
                    <span @click="removeUserFromFriends(user.email, friend)">Remove</span>
                </div>
            </div>
            </div>
        </div>

        <div v-if="friendsActive" class="flex justify-around pb-2 bg-slate-300">
            <div class="flex flex-row flex-wrap justify-center gap-5 w-[90%] mx-auto mt-5">
            <div v-for="friend in friendUsers" :key="friend" class="flex flex-row items-center text-center">
                <NuxtLink :to="`user/${user}`" class="flex justify-center flex-col items-center">
                    <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl w-28 h-fit">
                        <NuxtImg src="/userTemplate.jpg" />
                    </div>
                        <span>{{ friend }}</span>    
                </NuxtLink>
            </div>
            </div>
        </div>
        
        
    </section>

    <section v-if="activeBox === 'settings'" class="settings max-w-2xl mx-auto">
        <div>
            <div class="w-[90%] mx-auto">
                <div class="flex justify-between">
                    <button class="px-4 py-2 bg-[#2D61AF] rounded-xl text-white mb-5">Save changes</button>
                    <button @click="logoutUser()" class="px-4 py-2 bg-[#cbd5e1] rounded-xl text-white mb-5">Logout</button>
                </div>
                
                <div class="flex flex-col">
                    <label>Username</label>
                    <input placeholder="user1234" class="border rounded-lg border-black px-3 py-2  mb-4 placeholder:text-gray-600"/>
                </div>
                <div class="flex flex-col">
                    <label>Email</label>
                    <input placeholder="user1234@gmail.com" class="border rounded-lg border-black px-3 py-2  mb-4 placeholder:text-gray-600"/>
                </div>
                <div class="flex flex-col">
                    <label>Password</label>
                    <input placeholder="123456" class="border rounded-lg border-black px-3 py-2 mb-4 placeholder:text-gray-600"/>
                </div>
                
            </div>
        </div>
    </section> -->

</template>