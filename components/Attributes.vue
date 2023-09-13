<script setup lang="ts" >
const attributes = useAttributes()
const attributesArray = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'];

const addAttribute = () => {
    const target = event!.target as HTMLInputElement
    const attribute = target.id

    if(!attributes.value.includes(attribute)) {
        attributes.value.push(attribute)
    } else {
        const element = attributes.value.indexOf(attribute)
        attributes.value.splice(element,1)
    }
};

</script>


<template>

<div>
      Attributes 
    <br/>
    <div v-for="attribute in attributesArray">
      <input type="checkbox" @click="addAttribute" :id="attribute" :value="attribute"  />
      <label  :for="attribute">{{ attribute }}</label>
    </div>
    </div>

</template>


<style>


</style>