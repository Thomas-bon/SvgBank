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
    class="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-transform transform cursor-pointer"
    @click="handleClick"
  >
    <div class="w-14 h-14 mb-3 flex items-center justify-center">
      <div class="w-full h-full" v-html="icon.svg"></div>
    </div>
    <div class="text-sm text-gray-700 truncate w-full">{{ icon.name }}</div>
  </div>
</template>
