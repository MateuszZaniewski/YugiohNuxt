<script setup>

const { getFavouriteCards, addFavouriteCard } = useFirestoreUtils()
const fetchedFavouriteCards = ref([]);
const user = ref(null)



const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(user.value.email);
    fetchedFavouriteCards.value = favorites;
    console.log(fetchedFavouriteCards.value)
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
   const response = await initUser()
   user.value = response
   fetchFavoriteCards()
});

const activeBox = ref('favourites')

// here will be a database query to retrive a favourite cards, decks, friends and settings of desired user
const favourites = ['Dark Magician Girl', 'Dark Magician', 'Blue-Eyes White Dragon', 'Monster Reborn', 'Evenly Matched'];
const decks = ['Dark Magicians', 'Ultimate Blue Eyes Deck', 'Melffys Combo Deck'];
const friends = ['RollMopsik','Ernestozol','Łukasz']

</script>

<template>

    <NuxtImg @click="$router.go(-1)" src="/backArrowBlack.png" height="30px" width="30px"  class=" mt-8 ml-8"/>

    <section v-if="user">
        <div class="flex justify-center">
            <NuxtImg :src="user.photoURL ? user.photoURL : '/userTemplate.jpg'" height="100px" width="100px" class="rounded-full"/>
        </div>
        <div class="flex justify-center pt-5">
            <div>
                <span class="text-2xl">{{ user.displayName }}</span>
            </div>
        </div>
    </section>

    <section class="flex justify-around py-8">
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

    <section v-if="activeBox === 'favourites'" class="favourites">
        <div class="flex flex-col gap-5 w-[90%] mx-auto">
            <div v-for="fav in fetchedFavouriteCards" :key="fav" class="px-4 py-2 bg-[#cbd5e1] rounded-xl">
                <NuxtLink :to="`card/${fav.card}`">
                    <span class="text-xl">{{ fav.card }}</span>
                </NuxtLink>
            </div>
        </div>
    </section>

    <section v-if="activeBox === 'decks'" class="decks">
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

    <section v-if="activeBox === 'friends'" class="friends">
        <div class="flex flex-col gap-5 w-[90%] mx-auto">
            <div v-for="friend in friends" :key="friend" class="px-4 py-2 bg-[#cbd5e1] rounded-xl">
                <NuxtLink :to="`card/${friend}`">
                    <span class="text-xl">{{ friend }}</span>
                </NuxtLink>
            </div>
        </div>
    </section>

    <section v-if="activeBox === 'settings'" class="settings">
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