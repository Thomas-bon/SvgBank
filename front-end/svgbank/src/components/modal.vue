<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  icon: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);
const closeModal = () => emit('close');
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full h-100 flex relative">
        <button @click="closeModal" class="absolute top-2 right-3 text-gray-500 text-2xl">&times;</button>

        <div class="flex-1 p-8 flex items-center justify-center border-r">
          <div class="w-48 h-48" v-html="icon.svg"></div>
        </div>
      </div>
    </div>
  </teleport>
</template>
