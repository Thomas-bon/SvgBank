<script setup>
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderComponent from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import IconEditorModal from './components/IconEditorModal.vue'

import { iconsData, categoryData, getIcons, getCategory, updateIcon } from '@/store'
import { isIconEditorOpen, closeIconEditor } from '../src/store/uiState.js'

// données pour la modale
const icons = computed(() => iconsData.value)
const categories = computed(() => Array.isArray(categoryData.value) ? categoryData.value : [])
const tagSuggestions = computed(() => {
  const s = new Set()
  for (const ic of icons.value || []) for (const t of ic?.tags || []) s.add(String(t).toLowerCase())
  return Array.from(s).sort()
})

// charge les données au root (optionnel si tu les charges ailleurs)
onMounted(() => {
  getIcons()
  getCategory()
})

async function handleSave ({ _id, name, category, svg, tags }) {
  await updateIcon(_id, { name, category, svg, tags })
  closeIconEditor()
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <HeaderComponent class="border-b border-gray-800" />
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>

  <!-- 🧩 Modale montée une seule fois au root -->
  <IconEditorModal
    v-model="isIconEditorOpen"
    :icons="icons"
    :categories="categories"
    :tagSuggestions="tagSuggestions"
    @save="handleSave"
  />
</template>
