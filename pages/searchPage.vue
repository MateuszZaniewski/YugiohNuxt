<script setup lang="ts">

let galleryActive = ref(true);
let filtersExpanded = ref(false)

let fetchedCards = ref<Card[]>([]);

interface Card {
  id: string;
  name: string;
  card_images: {
    image_url: string;
  }[];
}

const attributes = useAttributes()
const monsterTypes = useMonsterTypes()
const cardRaces = useCardRaces()
const cardLevels = useCardLevels()
const fname = useFnameParam()

let attr = ref(attributes.value)



const searchForCards = async (name:String, attribute:Array<String>, level:Array<String>, race:Array<String>,type:Array<String>) => {
    try {
    const apiFetch = await connectToYugiohApi(name, attribute, level, race, type);
    if (apiFetch) {
      fetchedCards.value = apiFetch;
      console.log(fetchedCards.value);
    } else {
      // Handle the case when no cards are found
      fetchedCards.value = [];
      console.log('No cards found.');
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    fetchedCards.value = [];
  }
}

onMounted( () => {
  searchForCards(fname.value, attributes.value, cardLevels.value, cardRaces.value, monsterTypes.value)
});


</script>


<template>

<Navbar />

<section class="searchBar w-[90%] mx-auto pt-5 flex items-center">
    <input v-model="fname" type="search" placeholder="Search" class="search border-2 h-11 w-[80%] mx-auto rounded-l-3xl rounded-bl-3xl pl-[10%] text-base border-[#2D61AF]">
    <button @click="searchForCards(fname, attributes, cardLevels, cardRaces, monsterTypes), filtersExpanded = false" class="h-11 w-[20%] border-2 rounded-r-3xl rounded-br-3xl border-[#2D61AF] bg-[url('/glass.png')] bg-no-repeat bg-[#2D61AF] bg-center"></button>
</section>

<div class=" pt-5 w-[90%] mx-auto flex justify-between items-center">
    <div class="flex justify-center w-28 border-2 rounded-3xl border-black py-1 px-1">
        <NuxtImg src="/filter.png" height="20" width="20" />
        <span @click="filtersExpanded = !filtersExpanded">Filters</span>
    </div>

    <div>
        <div class="flex gap-5 items-center">
            <NuxtImg height="30" width='30' :src="galleryActive ? '/galleryActive.png' : '/galleryInactive.png'" />
            <NuxtImg height="30" width="30" :src="galleryActive ? '/listInactive.png' : '/listActive.png'"/>
        </div>
    </div>
</div>

<Filters v-model="attr" :class="filtersExpanded ? 'flex' : 'hidden'"/>

<div v-if="fetchedCards.length > 0 && !filtersExpanded" class="pt-6 flex flex-wrap justify-center gap-6 mx-auto w-[90%] max-w-3xl">

    <div v-for="card in fetchedCards.slice(0, 10)" class="w-[35vw] flex justify-center">
  <!-- <p>{{ card }}</p> -->
  <NuxtImg sizes="100vw sm:40vw md:200px" :src="card.card_images[0].image_url"  ></NuxtImg>
  
</div>

</div>

<div v-if="fetchedCards.length === 0 && !filtersExpanded">

    <p>No card matching your query was found.</p>

</div>


</template>



<style scoped>

.glass {
    background-image: url('../public/glass.png');
}

input::-webkit-search-cancel-button {
        padding-right: 10%;
    }


</style>