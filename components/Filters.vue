<script setup>

const attributes = useAttributes()
const monsterTypes = useMonsterTypes()
const cardRaces = useCardRaces()
const cardLevels = useCardLevels()

const attributesArray = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'];

const cardRacesArray = ['Spellcaster', 'Dragon', 'Zombie', 'Warrior', 'Beast-Warrior', 'Beast', 'Winged Beast', 'Fiend', 'Fairy', 'Insect', 'Dinosaur', 'Reptile' , 'Fish', 'Sea Serpent' , 'Aqua' , 'Pyro' , 'Thunder' , 'Rock' , 'Plant' , 'Machine' , 'Psychic', 'Divine-Beast', 'Wyrm', 'Cyberse', 'Creator-God','Equip', 'Field', 'Quick-Play', 'Ritual', 'Continuous', 'Normal','Counter'];

const monsterTypesArray = ["Effect Monster","Flip Effect Monster","Flip Tuner Effect Monster","Gemini Monster","Normal Monster","Normal Tuner Monster","Pendulum Effect Monster","Pendulum Effect Ritual Monster","Pendulum Flip Effect Monster","Pendulum Normal Monster","Pendulum Tuner Effect Monster","Ritual Effect Monster","Ritual Monster","Spell Card","Spirit Monster","Toon Monster","Trap Card","Tuner Monster","Union Effect Monster","Fusion Monster","Link Monster","Pendulum Effect Fusion Monster","Synchro Monster","Synchro Pendulum Effect Monster","Synchro Tuner Monster","XYZ Monster","XYZ Pendulum Effect Monster","Skill Card",
"Token"];

const levelsArray = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13'];


console.log(attributes.value);

const addAttribute = () => {
    const attribute = event.target.id

    if(!attributes.value.includes(attribute)) {
        attributes.value.push(attribute)
    } else {
        const element = attributes.value.indexOf(attribute)
        attributes.value.splice(element,1)
    }
};

const addMonsterRace = () => {
  const race = event.target.id

    if(!cardRaces.value.includes(race)) {
        cardRaces.value.push(race)
    } else {
        const element = cardRaces.value.indexOf(race)
        cardRaces.value.splice(element,1)
    }
};

const addLevels = () => {
  const level = event.target.id

    if(!cardLevels.value.includes(level)) {
      cardLevels.value.push(level)
    } else {
        const element = cardLevels.value.indexOf(level)
        cardLevels.value.splice(element,1)
    }
};

const addTypes = () => {
  const type = event.target.id

    if(!monsterTypes.value.includes(type)) {
      monsterTypes.value.push(type)
    } else {
        const element = monsterTypes.value.indexOf(type)
        monsterTypes.value.splice(element,1)
    }
};


</script>

<template>

<div>
    <div>
      Attributes 
    <br/>
    <div v-for="attribute in attributesArray">
      <input type="checkbox" @click="addAttribute" :id="attribute" :value="attribute"  />
      <label  :for="attribute">{{ attribute }}</label>
    </div>
    </div>

    <div>
      Monster Levels
    <br/>
    <div  v-for="level in levelsArray">
      <input type="checkbox" @click="addLevels" :id="level" :value="level"  />
      <label  :for="level">{{ level }}</label>
    </div>
    </div>


    <div>
      Monster Race
    <br/>
    <div v-for="monsterRace in cardRacesArray">
      <input type="checkbox" @click="addMonsterRace" :id="monsterRace" :value="monsterRace"  />
      <label  :for="monsterRace">{{ monsterRace }}</label>
    </div>
    </div>

    <div>
      Monster Types
    <br/>
    <div v-for="monsterType in monsterTypesArray">
      <input type="checkbox" @click="addTypes" :id="monsterType" :value="monsterType"  />
      <label  :for="monsterType">{{ monsterType }}</label>
    </div>
    </div>

</div>

   
</template>


<style>

.flex {display: flex;}

</style>