<script setup lang="ts" >
const attributes = useAttributes()
const attributesArray = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'];
const expanded = ref(false)

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
<span @click="expanded = !expanded">Attributes</span>
<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="attribute in attributesArray" class="flex gap-1">
      <input type="checkbox" @click="addAttribute" :id="attribute" :value="attribute"  />
      <label  :for="attribute">{{ attribute }}</label>
    </div>
    </div>

</template>


<style>


</style>