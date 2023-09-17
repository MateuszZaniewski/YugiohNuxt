<script setup lang="ts">

let fetchedCards = ref<Card[]>([]);
let name = ref('')

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

let attr = ref(attributes.value)

console.log(attributes.value)


const searchForCards = async (name:String, attribute:Array<String>, level:Array<String>, race:Array<String>,type:Array<String>) => {
  try {
    const apiFetch = await connectToYugiohApi(name,attribute,level,race,type)
    fetchedCards.value = apiFetch
    console.log(fetchedCards.value)
  } catch (error) {
    console.log(error)
    
  }
}

onMounted(() => {
  searchForCards(name.value, attributes.value, cardLevels.value, cardRaces.value, monsterTypes.value)
});


</script>

<template>

{{ attr }}

<Filters v-model="attr" />
<button @click="searchForCards(name, attributes, cardLevels, cardRaces, monsterTypes)" >Szukaj kart</button>
<div v-for="card in fetchedCards.slice(0, 10)">
  <p>{{ card }}</p>
  <img :src="card.card_images[0].image_url" />
  
</div>

</template>