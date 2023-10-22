<script setup>
import axios from "axios";
const user = ref(null)
const card = ref([])
const { useSetAttribute, useSetCardType } = useUtils()
const fetchedFavouriteCards = ref([]);
const isFavourite = ref(false)

const { getFavouriteCards, addFavouriteCard } = useFirestoreUtils()


const route = useRoute();

const fetchCards = async () => {
  try {
    const response = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${route.params.name}`
    );
    const fetchedCards = response.data.data;
    card.value = fetchedCards;

  } catch (error) {
    console.log(error);
  }
};

const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(user.value.email);
    fetchedFavouriteCards.value = favorites;
    console.log(fetchedFavouriteCards.value)
  } catch (error) {
    console.error(error);
  }
};

const containsCard = computed(() => {
  return () => {
    return fetchedFavouriteCards.value.some(obj => obj.card === route.params.name);
  };
});
    


onMounted(async () => {
  try {
    fetchCards();
    user.value = await initUser();
    fetchFavoriteCards();
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <section v-if="card.length > 0" class="flex flex-col items-center justify-center">
    <div class="flex justify-start w-full pt-4 pl-6" >
      <NuxtImg src="/backArrow.png" height="30px" width="30px" @click="$router.go(-1)"/>
    </div>
    

  <NuxtImg class="w-full max-w-[300px] py-5 rounded-lg " :src="card[0].card_images[0].image_url" />

  <h1 class="text-3xl text-center">{{ card[0].name}}</h1>

  <div class="flex w-[50%] mx-auto pt-2 justify-around">
                  <NuxtImg @click="addFavouriteCard(card[0].name, user.email )" :src='containsCard() ? "/fullHeart.png" : "/emptyHeart.png"' height="30px" width="30px" alt="Add to favourites"/>
                  <NuxtImg src="/add.png" height="30px" width="30px" alt="Add to deck" />
  </div>

  <div class="bg-[#142D45] text-white w-[90%] mx-auto rounded-t-xl py-2 px-2 mt-2">
    <div class="flex gap-4 justify-center pb-2 pt-2 ">
    <div class="flex gap-2 items-center">
            <NuxtImg
              :src="useSetAttribute(card[0])"
              height="20px"
              width="20px"
            />
            <span v-if="card[0].attribute">{{
              card[0].attribute
            }}</span>
            <span v-else>{{ card[0].type }}</span>
    </div>
    <div v-if="card[0].level" class="flex gap-2 items-center">
            <NuxtImg src="/level.webp" height="20px" width="20px" />
            <span>{{ card[0].level }}</span>
    </div>
    <div v-if="!card[0].level" class="flex gap-2 items-center">
            <NuxtImg
              :src="useSetCardType(card[0])"
              height="20px"
              width="20px"
            />
            <span>{{ card[0].race }}</span>
    </div>
  </div>
  <div v-if="card[0].atk >= 0" class="flex gap-4 pb-2 justify-center">
          <div class="flex gap-1">
            <span class="font-bold">ATK/</span>
            <span>{{ card[0].atk }}</span>
          </div>
          <div class="flex gap-1">
            <span class="font-bold">DEF/</span>
            <span>{{ card[0].def }}</span>
          </div>
  </div>
  <div v-if="card[0].atk >= 0" class="flex justify-center">
          <!-- [ Beast / Effect / Tuner ] -->
          <span class="font-bold">
            [<span>{{ card[0].race }} </span>
            <span v-if="card[0].type != 'Normal Monster'"
              >/ {{ card[0].type }}</span
            >]</span
          >
    </div>
    <div class="pt-4 pb-4 w-[90%] mx-auto text-left">
          <p class="whitespace-pre-line">{{ card[0].desc}}</p>
    </div>
  </div>

  
    


  </section>
  
</template>

<style scoped></style>
