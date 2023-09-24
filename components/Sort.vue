<script setup lang="ts">
const expanded = ref(false);
const sort = useSort();
const method = useSortMethod();
const sortArray = ['Name','ATK','DEF','Type','Level','ID','New','Relevance'];
const methodArray = ['Ascending','Descending']

const addSortParam = () => {
    const target = event!.target as HTMLInputElement
    const param = target.id
    
    if(sort.value != param){
        sort.value = param
    } else {
        sort.value = 'Name'
    }

    console.log(sort)
};

const addMethodSort = () => {
    const target = event!.target as HTMLInputElement
    const param = target.id

    method.value = param
};


</script>


<template>

<div class="flex pt-4 gap-5">
    <span class="w-28" @click="expanded = !expanded">Sort results</span>
    <NuxtImg src="/bottomArrow.png" />
</div>

<div v-if="expanded">
    <div v-for="element in methodArray" class="flex gap-1">
      <input :checked="method === element" type="checkbox" @click="addMethodSort" :id="element" :value="element"  />
      <label :for="element">{{ element }}</label>
    </div>
</div>

<div class="flex flex-row flex-wrap gap-2" v-if="expanded">
    <div v-for="element in sortArray" class="flex gap-1">
      <input :checked="sort === element" type="checkbox" @click="addSortParam" :id="element" :value="element"  />
      <label :for="element">{{ element }}</label>
    </div>
</div>

</template>


<style scoped>



</style>