<script setup lang="ts">
const cardRaces = useCardRaces();
const cardRacesArray = [
  "Equip",
  "Field",
  "Quick-Play",
  "Ritual",
  "Continuous",
  "Normal",
  "Counter",
];
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
  <section class="pb-2 border-b-2">
    <div
      @click="expanded = !expanded"
      class="flex pt-4 gap-5 justify-between pr-5"
    >
      <span class="w-40">Spell & Trap Types</span>
      <NuxtImg
        :src="expanded ? '/upArrow.png' : '/arrowDown.png'"
        class="w-5 h-5"
      />
    </div>
    <div class="flex flex-row flex-wrap gap-2 pt-4" v-if="expanded">
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
  </section>
</template>
