<script setup lang="ts" >

const cardLevels = useCardLevels()
const levelsArray = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13'];
const expanded = ref(false)

const addLevels = () => {
    const target = event!.target as HTMLInputElement
  const level = target.id

    if(!cardLevels.value.includes(level)) {
      cardLevels.value.push(level)
    } else {
        const element = cardLevels.value.indexOf(level)
        cardLevels.value.splice(element,1)
    }
};

</script>


<template>
<span @click="expanded = !expanded">Levels</span>
<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div  v-for="level in levelsArray" class="flex gap-1">
      <input type="checkbox" @click="addLevels" :id="level" :value="level"  />
      <label  :for="level">{{ level }}</label>
    </div>
    </div>

</template>


<style>


</style>