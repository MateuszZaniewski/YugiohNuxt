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
<div class="flex pt-4 gap-5">
    <span class="w-28" @click="expanded = !expanded">Attributes</span>
    <NuxtImg src="/bottomArrow.png" />
</div>

<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="attribute in attributesArray" class="flex gap-1">
      <input :checked="attributes.includes(attribute)" type="checkbox" @click="addAttribute" :id="attribute" :value="attribute"  />
      <label :for="attribute">{{ attribute }}</label>
    </div>
    </div>

</template>


<style>


</style>