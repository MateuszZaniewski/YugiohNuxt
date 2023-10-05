<script setup>
import axios from "axios";

const card = ref([])

const setAttribute = (card) => {
  return card.attribute === "DARK"
    ? "./Attributes/DARK.png"
    : card.attribute === "LIGHT"
    ? "./Attributes/LIGHT.png"
    : card.attribute === "EARTH"
    ? "./Attributes/EARTH.png"
    : card.attribute === "WATER"
    ? "./Attributes/WATER.png"
    : card.attribute === "FIRE"
    ? "./Attributes/FIRE.png"
    : card.attribute === "WIND"
    ? "./Attributes/WIND.png"
    : card.attribute === "DIVINE"
    ? "./Attributes/DIVINE.png"
    : card.type === "Spell Card"
    ? "./Attributes/SPELL.svg"
    : card.type === "Trap Card"
    ? "./Attributes/TRAP.svg"
    : "xD";
};

const setCardType = (card) => {
  return card.race === "Continuous"
    ? "./CardTypes/Continuous.png"
    : card.race === "Counter"
    ? "./CardTypes/Counter.png"
    : card.race === "Equip"
    ? "./CardTypes/Equip.png"
    : card.race === "Field"
    ? "./CardTypes/Field.png"
    : card.race === "Normal"
    ? "./CardTypes/Normal.png"
    : card.race === "Quick-Play"
    ? "./CardTypes/Quick-Play.png"
    : "./CardTypes/Ritual.png";
};

const route = useRoute();

console.log(route.params.name)


const fetchCards = async () => {
  try {
    const response = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${route.params.name}`
    );
    const fetchedCards = response.data.data;
    card.value = fetchedCards;
    console.log(card.value)

  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
    fetchCards();
  });

</script>

<template>
  <section v-if="card.length > 0">

    <h1>{{ card[0].name}}</h1>

  <NuxtImg :src="card[0].card_images[0].image_url" />

  <div class=" bg-emerald-900 h-28 w-28 flex ">

    <div class="flex gap-2 items-center">
            <NuxtImg
              :src="setAttribute(card[0])"
              height="30px"
              width="30px"
            />
            <span v-if="card.attribute">{{
              card.attribute
            }}</span>
            <span v-else>{{ card.type }}</span>
          </div>
          <div v-if="card.level" class="flex gap-2 items-center">
            <NuxtImg src="/level.webp" height="30px" width="30px" />
            <span>{{ card.level }}</span>
          </div>
          <div v-if="!card.level" class="flex gap-2 items-center">
            <NuxtImg
              :src="setCardType(card[0])"
              height="30px"
              width="30px"
            />
            <span>{{ card.race }}</span>
          </div>


  </div>
  </section>
  
</template>

<style scoped></style>
