<script setup lang="ts" >

const monsterTypes = useMonsterTypes()
const monsterTypesArray = ["Effect Monster","Flip Effect Monster","Flip Tuner Effect Monster","Gemini Monster","Normal Monster","Normal Tuner Monster","Pendulum Effect Monster","Pendulum Effect Ritual Monster","Pendulum Flip Effect Monster","Pendulum Normal Monster","Pendulum Tuner Effect Monster","Ritual Effect Monster","Ritual Monster","Spell Card","Spirit Monster","Toon Monster","Trap Card","Tuner Monster","Union Effect Monster","Fusion Monster","Link Monster","Pendulum Effect Fusion Monster","Synchro Monster","Synchro Pendulum Effect Monster","Synchro Tuner Monster","XYZ Monster","XYZ Pendulum Effect Monster","Skill Card",
"Token"];

const expanded = ref(false)

const expandParams = () => {
  expanded.value = !expanded.value
}

const addTypes = () => {
    const target = event!.target as HTMLInputElement
    const type = target.id


    if(!monsterTypes.value.includes(type)) {
      monsterTypes.value.push(type)
      console.log(monsterTypes.value)
      
    } else {
        const element = monsterTypes.value.indexOf(type)
        monsterTypes.value.splice(element,1)
    }

};

</script>


<template>
<div class="flex pt-4 gap-5">
    <span class="w-28" @click="expandParams">Monster Types</span>
    <NuxtImg src="/bottomArrow.png" />
</div>
<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="monsterType in monsterTypesArray" class="flex gap-1">
      <input :checked="monsterTypes.includes(monsterType)" class="monsterType" type="checkbox" @click="addTypes" :id="monsterType" :value="monsterType"  />
      <label  :for="monsterType">{{ monsterType }}</label>
    </div>
    </div>

</template>


<style>


</style>