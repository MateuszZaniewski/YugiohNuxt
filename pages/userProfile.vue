<script setup>

const { getFavouriteCards, addFavouriteCard, fetchAllUsers } = useFirestoreUtils()
const fetchedFavouriteCards = ref([]);
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser
const allUsers = ref(null)




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
}


onMounted(async () => {
   fetchFavoriteCards()
   fetchUsers()
});

const activeBox = ref('favourites')

// here will be a database query to retrive a favourite cards, decks, friends and settings of desired user
const favourites = ['Dark Magician Girl', 'Dark Magician', 'Blue-Eyes White Dragon', 'Monster Reborn', 'Evenly Matched'];
const decks = ['Dark Magicians', 'Ultimate Blue Eyes Deck', 'Melffys Combo Deck'];

</script>

<template>

    <NuxtImg @click="$router.go(-1)" src="/backArrowBlack.png" height="30px" width="30px"  class=" mt-8 ml-8"/>

    <section v-if="user" class=" max-w-3xl mx-auto">
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
        <div class="flex flex-row flex-wrap justify-center gap-5 w-[90%] mx-auto">
            <div v-for="friend in allUsers" :key="friend" class="flex flex-row items-center text-center">
                <NuxtLink :to="`user/${user}`" class="flex justify-center flex-col items-center">
                    <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl w-28 h-fit">
                        <NuxtImg src="/userTemplate.jpg" />
                    </div>
                        <span>{{ friend }}</span>    
                </NuxtLink>
                
                 

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
    </section>

</template>