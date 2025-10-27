<script setup>
import { ref, computed } from 'vue'
import BaseModal from "@/components/updateIcon.vue"; 
import { deleteIcon } from '@/store'

const props = defineProps({
  modelValue: { type: Boolean, default: false }, 
  icons: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'deleted'])

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const selectedIcon = ref(null)

function pickIcon(icon) {
  selectedIcon.value = icon
}

async function onDelete() {
  if (!selectedIcon.value) return
  try {
    await deleteIcon(selectedIcon.value._id)
    emit('deleted')
    isOpen.value = false
    selectedIcon.value = null
  } catch (err) {
    console.error('Erreur lors de la suppression :', err)
  }
}
</script>

<template>
  <BaseModal v-model="isOpen" :panelClass="'w-[50%] max-w-[500px]'">
    <template #header>
      <h2 class="text-lg font-semibold text-red-600">Supprimer une icône</h2>
    </template>

    <div class="p-4">
      <ul class="max-h-64 overflow-y-auto">
        <li v-for="icon in icons" :key="icon._id" 
            @click="pickIcon(icon)"
            :class="[
              'p-2 cursor-pointer rounded border mb-2 flex items-center gap-2',
              selectedIcon && selectedIcon._id === icon._id ? 'bg-red-100 border-red-500' : 'bg-gray-50 border-gray-300'
            ]">
          <div class="w-8 h-8 flex items-center justify-center" v-html="icon.svg"></div>
          <span class="truncate">{{ icon.name }}</span>
        </li>
      </ul>

      <p v-if="!selectedIcon" class="text-gray-500 mt-2">Sélectionne une icône à supprimer.</p>
      <p v-else class="text-red-600 mt-2">Tu es sur le point de supprimer : <strong>{{ selectedIcon.name }}</strong></p>
    </div>

    <template #footer>
      <button class="px-3 py-2 rounded bg-gray-200 mr-2" @click="isOpen = false">Annuler</button>
      <button class="px-3 py-2 rounded bg-red-600 text-white" @click="onDelete" :disabled="!selectedIcon">Supprimer</button>
    </template>
  </BaseModal>
</template>
