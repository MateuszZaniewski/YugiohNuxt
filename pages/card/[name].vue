<script setup>
import axios from "axios";

const card = ref([]);

// const fetchCards = async () => {
//   try {
//     const response = await axios.get(
//       `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${this.$route.params.name}`
//     );
//     const fetchedCards = response.data.data;
//     card.value = fetchedCards;
//     console.log(card.value)

//   } catch (error) {
//     console.log(error);
//   }
// };
</script>

<template>
  {{ this.$route.params.name }}
</template>

<style scoped></style>
