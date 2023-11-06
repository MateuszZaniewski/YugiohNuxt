<script setup lang="ts">
const monsterTypes = useMonsterTypes();
const monsterTypesArray = [
  "Effect Monster",
  "Flip Effect Monster",
  "Flip Tuner Effect Monster",
  "Gemini Monster",
  "Normal Monster",
  "Normal Tuner Monster",
  "Pendulum Effect Monster",
  "Pendulum Effect Ritual Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "Ritual Effect Monster",
  "Ritual Monster",
  "Spell Card",
  "Spirit Monster",
  "Toon Monster",
  "Trap Card",
  "Tuner Monster",
  "Union Effect Monster",
  "Fusion Monster",
  "Link Monster",
  "Pendulum Effect Fusion Monster",
  "Synchro Monster",
  "Synchro Pendulum Effect Monster",
  "Synchro Tuner Monster",
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
  "Skill Card",
  "Token",
];

const expanded = ref(false);

const expandParams = () => {
  expanded.value = !expanded.value;
};

const addTypes = () => {
  const target = event!.target as HTMLInputElement;
  const type = target.id;

  if (!monsterTypes.value.includes(type)) {
    monsterTypes.value.push(type);
    console.log(monsterTypes.value);
  } else {
    const element = monsterTypes.value.indexOf(type);
    monsterTypes.value.splice(element, 1);
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
        <span>Monster Types</span>
        <div
          class="flex items-center justify-center border border-[#2D61AF] rounded-3xl px-3 text-white bg-[#2D61AF] gap-1"
          v-if="monsterTypes.length > 0"
          @click="monsterTypes = []"
        >
          <span>{{ monsterTypes.length }}</span>
          <span>x</span>
        </div>
      </div>
      <NuxtImg
        :src="expanded ? '/upArrow.png' : '/arrowDown.png'"
        class="w-5 h-5"
      />
    </div>
    <div class="flex flex-row flex-wrap gap-2 pt-4" v-if="expanded">
      <div v-for="monsterType in monsterTypesArray" class="flex gap-1">
        <input
          :checked="monsterTypes.includes(monsterType)"
          class="monsterType peer appearance-none"
          type="checkbox"
          @click="addTypes"
          :id="monsterType"
          :value="monsterType"
        />
        <label
          class="peer-checked:bg-[#2D61AF] peer-checked:text-white border-2 rounded-xl px-3 py-1"
          :for="monsterType"
          >{{ monsterType }}</label
        >
      </div>
    </div>
  </section>
</template>