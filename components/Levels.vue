<script setup lang="ts">
const cardLevels = useCardLevels();
const levelsArray = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
const expanded = ref(false);

const addLevels = () => {
  const target = event!.target as HTMLInputElement;
  const level = target.id;

  if (!cardLevels.value.includes(level)) {
    cardLevels.value.push(level);
  } else {
    const element = cardLevels.value.indexOf(level);
    cardLevels.value.splice(element, 1);
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
        <span>Levels</span>
        <div
          class="flex items-center justify-center border border-[#2D61AF] rounded-3xl px-3 text-white bg-[#2D61AF] gap-1"
          v-if="cardLevels.length > 0"
          @click="cardLevels = []"
        >
          <span>{{ cardLevels.length }}</span>
          <span>x</span>
        </div>
      </div>

      <NuxtImg
        :src="expanded ? '/upArrow.png' : '/arrowDown.png'"
        class="w-5 h-5"
      />
    </div>
    <div class="flex flex-row flex-wrap gap-2 pt-4" v-if="expanded">
      <div v-for="level in levelsArray" class="flex gap-1">
        <input
          :checked="cardLevels.includes(level)"
          type="checkbox"
          @click="addLevels"
          :id="level"
          :value="level"
          class="peer appearance-none"
        />
        <label
          class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
          :for="level"
          >{{ level }}</label
        >
      </div>
    </div>
  </section>
</template>

<style></style>
