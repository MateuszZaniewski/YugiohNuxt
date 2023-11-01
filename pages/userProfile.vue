<script setup>

const { getFavouriteCards, addFriend, removeFriend, fetchFriends, fetchAllUsers } = useFirestoreUtils()
const fetchedFavouriteCards = ref([]);
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser
const allUsers = ref(null)
const friendsActive = ref(true)
const friendUsers = ref(null)



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
    } catch (error) {
        console.log(error)
    }
};

const fetchFriend = async () => {
    try {
        const friends = await fetchFriends(user.email)
        friendUsers.value = friends
    } catch (error) {
        console.log(error)
    }
};

const addUserToFriend = async (userId, friendName) => {
    try {
        await addFriend(userId, friendName )
        await fetchFriend()
    } catch (error) {
        console.log(error)
    }
};

const removeUserFromFriends = async (userId, friendName) => {
    try {
        await removeFriend(userId, friendName)
        await fetchFriend()
    } catch (error) {
        console.log(error)
    }
};

onMounted(async () => {
   fetchFavoriteCards()
   fetchUsers()
   fetchFriend()
   console.log(friendUsers.value)
});

const activeBox = ref('favourites')

// here will be a database query to retrive a favourite cards, decks, friends and settings of desired user
const favourites = ['Dark Magician Girl', 'Dark Magician', 'Blue-Eyes White Dragon', 'Monster Reborn', 'Evenly Matched'];
const decks = ['Dark Magicians', 'Ultimate Blue Eyes Deck', 'Melffys Combo Deck'];

</script>

<template>

    <NuxtImg @click="$router.go(-1)" src="/backArrowBlack.png" height="30px" width="30px"  class=" mt-8 ml-8"/>

    <section v-if="user" class=" max-w-3xl mx-auto">
        <div class="flex justify-end pr-10">
            <NuxtImg :src="user.photoURL ? user.photoURL : '/userTemplate.jpg'" height="60px" width="60px" class="rounded-full"/>
        </div>
        <div class="flex justify-end pr-10 pt-3">
            <div>
                <span class="text-xl">{{ user.displayName }}</span>
            </div>
        </div>
    </section>


    <section id="favouriteCards"  class=" py-5">
        <div class="flex gap-2 items-center pb-3">
            <NuxtImg src="/user/starBlack.svg" />
            <span>Favourite Cards</span>
            <NuxtImg src="/arrowDown.png" height="15px" width="15px" />
        </div>

        <div class="h-[250px] w-[90%] mx-auto bg-[#0036F8] bg-opacity-10 rounded-2xl pl-5 gap-7 flex items-center overflow-x-auto">
            <div v-for="fav in fetchedFavouriteCards" :key="fav" class="w-[110px] flex-shrink-0">
                <NuxtLink :to="`card/${fav.card}`" class="">
                    <NuxtImg :src="fav.image" height="100%" width="110px"/>
                </NuxtLink>
            </div>
        </div>

    </section>

    <section id="Decks"  class=" py-5">
        <div class="flex gap-2 items-center pb-3">
            <NuxtImg src="/user/deckBlack.svg" />
            <span>Decks</span>
            <NuxtImg src="/arrowDown.png" height="15px" width="15px" />
        </div>
    </section>

    <section id="Social"  class=" py-5">
        <div class="flex gap-2 items-center pb-3">
            <NuxtImg src="/user/friendsBlack.svg" />
            <span>Friends/Users</span>
            <NuxtImg src="/arrowDown.png" height="15px" width="15px" />
        </div>
    </section>

    <section id="Settings"  class=" py-5">
        <div class="flex gap-2 items-center pb-3">
            <NuxtImg src="/user/settingsBlack.svg" />
            <span>Settings</span>
            <NuxtImg src="/arrowDown.png" height="15px" width="15px" />
        </div>
    </section>

    <!-- <section class="flex justify-around py-8 max-w-xl mx-auto">
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
    </section> -->

    <!-- <section v-if="activeBox === 'favourites'" class="favourites max-w-2xl mx-auto">
        <div class="flex flex-col gap-5 w-[90%] mx-auto">
            <div v-for="fav in fetchedFavouriteCards" :key="fav" class="px-4 py-2 bg-[#cbd5e1] rounded-xl">
                <NuxtLink :to="`card/${fav.card}`">
                    <span class="text-xl">{{ fav.card }}</span>
                </NuxtLink>
            </div>
        </div>
    </section> -->

    <!-- <section v-if="activeBox === 'decks'" class="decks max-w-2xl mx-auto">
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
    </section> -->

                

    <!-- <section v-if="activeBox === 'friends'" class="friends max-w-2xl mx-auto">

        <div class="flex w-[90%] mx-auto justify-around">
            <div class="w-[50%] text-center py-4 rounded-t-xl" :class="friendsActive ? 'bg-slate-300' : 'bg-none'" @click="friendsActive = true">
                <span>Friends</span>
            </div>
            <div class="w-[50%] text-center py-4 rounded-t-xl" :class="!friendsActive ? 'bg-slate-300' : 'bg-none'" @click="friendsActive = false">
                <span>All users</span>
            </div>
        </div>

        
        <div v-if="!friendsActive" class="w-[90%] mx-auto pb-2 bg-slate-300">
            <div class="flex flex-col justify-center gap-5 w-[90%] mx-auto">
            <div v-for="friend in allUsers" :key="friend" class="flex flex-row justify-between pt-2 items-center text-center">
                <div class="flex justify-center items-center">
                    <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl h-fit">
                        <NuxtLink :to="`user/${user}`" class="" >
                            <NuxtImg src="/userTemplate.jpg" height="50px" width="50px" />
                        </NuxtLink>
                        
                    </div>
                        <span>{{ friend }}</span>    
                </div>
                <div class="flex flex-col gap-2">
                    <span v-if="!friendUsers.includes(friend)" @click="addUserToFriend(user.email, friend)">Add Friend</span>
                    <span v-if="friendUsers.includes(friend)" @click="removeUserFromFriends(user.email, friend)">Remove</span>
                </div>
            </div>
            </div>
        </div>

        
        <div v-if="friendsActive" class="w-[90%] mx-auto pb-2 bg-slate-300">
            <div class="flex flex-row flex-wrap justify-center gap-5 w-[90%] mx-auto">
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
        
        
    </section> -->

    <!-- <section v-if="activeBox === 'settings'" class="settings max-w-2xl mx-auto">
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