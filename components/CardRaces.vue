<script setup lang="ts" >

const cardRaces = useCardRaces()
const cardRacesArray = ['Spellcaster', 'Dragon', 'Zombie', 'Warrior', 'Beast-Warrior', 'Beast', 'Winged Beast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile' , 'Fish', 'Sea Serpent' , 'Aqua' , 'Pyro' , 'Thunder' , 'Rock' , 'Plant' , 'Machine' , 'Psychic', 'Divine-Beast', 'Wyrm', 'Cyberse', 'Creator-God','Equip', 'Field', 'Quick-Play', 'Ritual', 'Continuous', 'Normal','Counter'];
const expanded = ref(false)


const addMonsterRace = () => {
    const target = event!.target as HTMLInputElement
    const race = target.id

    if(!cardRaces.value.includes(race)) {
        cardRaces.value.push(race)
    } else {
        const element = cardRaces.value.indexOf(race)
        cardRaces.value.splice(element,1)
    }
};

</script>


<template>
<div class="flex pt-4 gap-5">
    <span class="w-28" @click="expanded = !expanded">Monster Races</span>
    <NuxtImg src="/bottomArrow.png" />
</div>
<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="monsterRace in cardRacesArray" class="flex gap-1">
      <input :checked="cardRaces.includes(monsterRace)" type="checkbox" @click="addMonsterRace" :id="monsterRace" :value="monsterRace"  />
      <label  :for="monsterRace">{{ monsterRace }}</label>
    </div>
    </div>

</template>


<style>


</style>