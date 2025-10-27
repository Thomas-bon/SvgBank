<script setup>
import { ref, computed, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  icon: { type: Object, required: true },
  show: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])
const closeModal = () => emit('close')

const color = ref('#74c0fc')
const inputRef = ref(null)

const coloredSvg = computed(() => {
  if (!props.icon.svg) return '';
  return props.icon.svg.replace(/fill="[^"]*"/g, `fill="${color.value}"`);
});

function openColorPicker() {
  inputRef.value?.click()
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-[rgba(24,49,83,0.5)] flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl max-w-4xl w-full h-96 flex relative overflow-hidden">
        <button
          @click="closeModal"
          class="absolute top-2 right-3 text-gray-500 text-2xl"
        >
          &times;
        </button>

        <div class="relative flex-1 flex items-center justify-center m-8 border-2 border-[rgba(195,198,209,0.5)] rounded-2xl">
          <div class="relative w-48 h-48" v-html="coloredSvg"></div>

          <FontAwesomeIcon
            :icon="faPalette"
            size="xl"
            class="absolute bottom-12 left-12 cursor-pointer !text-[rgb(20,110,190)]"
            @click="openColorPicker"
          />
          <input
            ref="inputRef"
            type="color"
            v-model="color"
            class="absolute opacity-0 w-0 h-0"
          />
        </div>

        <div class="flex-1 flex flex-col p-8">
          <h2 class="text-lg font-semibold mb-2">{{ icon.name }}</h2>

          <div
            class="flex-1 overflow-auto bg-[rgb(24,49,83)] border rounded-lg p-3 text-sm whitespace-pre-wrap text-white font-mono"
          >
            {{ coloredSvg }}
          </div>

          <button
            @click="navigator.clipboard.writeText(coloredSvg)"
            class="mt-3 w-full px-4 py-2 bg-[rgb(255,212,59)] hover:bg-[rgb(250,176,5)] border-2 border-b-8 border-[rgb(24,49,83)] rounded-2xl cursor-pointer"
          >
            Copy SVG
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
