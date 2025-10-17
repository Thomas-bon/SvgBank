<script setup>
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
      class="fixed inset-0 bg-[rgba(24,49,83,0.5)] flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl max-w-4xl w-full h-96 flex relative overflow-hidden">
        <button @click="closeModal" class="absolute top-2 right-3 text-gray-500 text-2xl">&times;</button>
        <div class="flex-1 flex items-center justify-center m-8 border-2 border-[rgba(195,198,209,0.5)] rounded-2xl">
          <div class="w-48 h-48" v-html="icon.svg"></div>
        </div>

        <div class="flex-1 flex flex-col p-8">
          <h2 class="text-lg font-semibold mb-2">{{ icon.name }}</h2>
          <div class="flex-1 overflow-auto bg-[rgb(24,49,83)] border rounded-lg p-3 text-sm whitespace-pre-wrap !text-white !font-mono">
            {{ icon.svg }}
          </div>

          <button
            @click="navigator.clipboard.writeText(icon.svg)"
            class="mt-3 w-full px-4 py-2 bg-[rgb(255,212,59)] hover:bg-[rgb(250,176,5)] border-2 border-b-8 border-[rgb(24,49,83)] rounded-2xl cursor-pointer"
          >
            Copy SVG
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
