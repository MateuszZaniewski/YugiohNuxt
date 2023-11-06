<script setup lang="ts">
const attributes = useAttributes();
const attributesArray = [
  "DARK",
  "LIGHT",
  "EARTH",
  "WATER",
  "FIRE",
  "WIND",
  "DIVINE",
];
const expanded = ref(false);

const addAttribute = () => {
  const target = event!.target as HTMLInputElement;
  const attribute = target.id;

  if (!attributes.value.includes(attribute)) {
    attributes.value.push(attribute);
  } else {
    const element = attributes.value.indexOf(attribute);
    attributes.value.splice(element, 1);
  }
};
</script>

<template>
  <section class="pb-2 border-b-2">
    <div
      @click="expanded = !expanded"
      class="flex pt-4 gap-5 justify-between pr-5"
    >
      <div class="flex gap-4">
        <span>Attribute</span>
        <div
          class="flex items-center justify-center border border-[#2D61AF] rounded-3xl px-3 text-white bg-[#2D61AF] gap-1"
          v-if="attributes.length > 0"
          @click="attributes = []"
        >
          <span>{{ attributes.length }}</span>
          <span>x</span>
        </div>
      </div>

      <NuxtImg
        :src="expanded ? '/upArrow.png' : '/arrowDown.png'"
        class="w-5 h-5"
      />
    </div>

    <div class="flex flex-row flex-wrap gap-2 pt-4" v-if="expanded">
      <div v-for="attribute in attributesArray" class="flex gap-1">
        <input
          :checked="attributes.includes(attribute)"
          type="checkbox"
          @click="addAttribute"
          :id="attribute"
          :value="attribute"
          class="peer appearance-none"
        />
        <label
          class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
          :for="attribute"
          >{{ attribute }}</label
        >
      </div>
    </div>
  </section>
</template>
