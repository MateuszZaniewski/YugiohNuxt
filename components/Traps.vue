<script setup lang="ts">
const cardRaces = useCardRaces();
const cardRacesArray = ["Continuous", "Normal", "Counter"];
const expanded = ref(false);

const addMonsterRace = () => {
  const target = event!.target as HTMLInputElement;
  const race = target.id;

  if (!cardRaces.value.includes(race)) {
    cardRaces.value.push(race);
  } else {
    const element = cardRaces.value.indexOf(race);
    cardRaces.value.splice(element, 1);
  }
};
</script>

<template>
  <div class="flex pt-4 gap-5">
    <span class="w-28" @click="expanded = !expanded">Trap Types</span>
    <NuxtImg src="/bottomArrow.png" />
  </div>
  <div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="monsterRace in cardRacesArray" class="flex gap-1">
      <input
        :checked="cardRaces.includes(monsterRace)"
        type="checkbox"
        @click="addMonsterRace"
        :id="monsterRace"
        :value="monsterRace"
        class="peer appearance-none"
      />
      <label
        class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
        :for="monsterRace"
        >{{ monsterRace }}</label
      >
    </div>
  </div>
</template>

<style></style>
