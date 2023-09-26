<script setup>
const attributes = useAttributes();
const cardRaces = useCardRaces();
const cardLevels = useCardLevels();
const monsterTypes = useMonsterTypes();
const sort = useSort();
const order = useSortMethod();

const clearAllFilters = () => {
  attributes.value = [];
  cardRaces.value = [];
  cardLevels.value = [];
  monsterTypes.value = [];
  (sort.value = "Name"), (order.value = "Ascending");
};
</script>

<template>
  <div class="flex-col gap-2 py-6 w-[90%] mx-auto">
    <div class="flex justify-end">
      <button class="border rounded-3xl px-2 py-1" @click="clearAllFilters">
        Clear All Filters
      </button>
    </div>

    <Sort />
    <Attributes />
    <CardRaces />
    <Levels />
    <MonsterTypes />
    <Spells />
  </div>
</template>

<style>
.flex {
  display: flex;
}
</style>
