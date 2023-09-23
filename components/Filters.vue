<script setup>

const attributes = useAttributes();
const cardRaces = useCardRaces();
const cardLevels = useCardLevels();
const monsterTypes = useMonsterTypes();

const clearAllFilters = () => {
    attributes.value = []
    cardRaces.value = []
    cardLevels.value = []
    monsterTypes.value = []
};

</script>

<template>

<div class="flex-col gap-2 py-6 w-[90%] mx-auto">
    <button @click="clearAllFilters">Clear All Filters</button>
    <Attributes />
    <CardRaces />
    <Levels />
    <MonsterTypes />
</div>

   
</template>


<style>

.flex {display: flex;}

</style>