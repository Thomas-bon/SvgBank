<script setup>
const props = defineProps({
  icon: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);

function handleClick() {
  emit('click', props.icon);
}
</script>

<template>
  <div
    class="bg-white hover:bg-[rgb(255,212,59)] transition rounded-lg p-4 flex flex-col items-center text-center cursor-pointer"
    @click="handleClick"
  >
    <div class="w-14 h-14 mb-3 flex items-center justify-center">
      <div class="w-full h-full" v-html="icon.svg"></div>
    </div>
    <div class="text-sm truncate w-full">{{ icon.name }}</div>
  </div>
</template>