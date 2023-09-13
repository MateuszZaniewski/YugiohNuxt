<script setup lang="ts" >

const cardRaces = useCardRaces()
const cardRacesArray = ['Spellcaster', 'Dragon', 'Zombie', 'Warrior', 'Beast-Warrior', 'Beast', 'Winged Beast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile' , 'Fish', 'Sea Serpent' , 'Aqua' , 'Pyro' , 'Thunder' , 'Rock' , 'Plant' , 'Machine' , 'Psychic', 'Divine-Beast', 'Wyrm', 'Cyberse', 'Creator-God','Equip', 'Field', 'Quick-Play', 'Ritual', 'Continuous', 'Normal','Counter'];


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

<div>
      Monster Race
    <br/>
    <div v-for="monsterRace in cardRacesArray">
      <input type="checkbox" @click="addMonsterRace" :id="monsterRace" :value="monsterRace"  />
      <label  :for="monsterRace">{{ monsterRace }}</label>
    </div>
    </div>

</template>


<style>


</style>