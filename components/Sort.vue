<script setup lang="ts">
const expanded = ref(false);
const sort = useSort();
const method = useSortMethod();
const sortArray = [
  "Name",
  "ATK",
  "DEF",
  "Type",
  "Level",
  "ID",
  "New",
  "Relevance",
];
const methodArray = ["Ascending", "Descending"];

const addSortParam = () => {
  const target = event!.target as HTMLInputElement;
  const param = target.id;

  if (sort.value != param) {
    sort.value = param;
  } else {
    sort.value = "Name";
  }

  console.log(sort);
};

const addMethodSort = () => {
  const target = event!.target as HTMLInputElement;
  const param = target.id;

  method.value = param;
};
</script>

<template>
  <section class="pb-2 border-b-2">
    <div
      @click="expanded = !expanded"
      class="flex pt-4 gap-5 justify-between pr-5"
    >
      <span>Sort by</span>
      <NuxtImg
        :src="expanded ? '/upArrow.png' : '/arrowDown.png'"
        class="w-5 h-5"
      />
    </div>

    <span v-if="expanded">Order</span>
    <div class="flex flex-row flex-wrap gap-2 pt-2 pb-2" v-if="expanded">
      <div v-for="element in methodArray" class="flex gap-1">
        <input
          :checked="method === element"
          type="checkbox"
          @click="addMethodSort"
          :id="element"
          :value="element"
          class="peer appearance-none"
        />
        <label
          class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
          :for="element"
          >{{ element }}</label
        >
      </div>
    </div>
    <span v-if="expanded">Parameters</span>
    <div class="flex flex-row flex-wrap gap-2 pt-2 pb-2" v-if="expanded">
      <div v-for="element in sortArray" class="flex gap-1">
        <input
          :checked="sort === element"
          type="checkbox"
          @click="addSortParam"
          :id="element"
          :value="element"
          class="peer appearance-none"
        />
        <label
          class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
          :for="element"
          >{{ element }}</label
        >
      </div>
    </div>
  </section>
</template>
