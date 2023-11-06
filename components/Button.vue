<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <button class="w-36 h-8 rounded-3xl">
    {{ text }}
  </button>
</template>
