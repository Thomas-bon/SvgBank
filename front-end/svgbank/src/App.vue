<script setup>
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderComponent from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import IconEditorModal from './components/IconEditorModal.vue'
import CreateIcon from './components/IconCreate.vue'
import IconDelete from './components/iconDelete.vue'

import { iconsData, categoryData, getIcons, getCategory, updateIcon } from '@/store'
import { isIconEditorOpen, closeIconEditor, isCreateIconOpen, closeCreateIcon, isDeleteIconOpen, closeDeleteIcon } from '../src/store/uiState.js'


// données pour la modale
const icons = computed(() => iconsData.value)
const categories = computed(() =>
  Array.isArray(categoryData.value) ? categoryData.value : []
)
const tagSuggestions = computed(() => {
  const s = new Set()
  for (const ic of icons.value || []) for (const t of ic?.tags || []) s.add(String(t).toLowerCase())
  return Array.from(s).sort()
})

// charge les données au root
onMounted(() => {
  getIcons()
  getCategory()
})

async function handleSave({ _id, name, category, svg, tags }) {
  await updateIcon(_id, { name, category, svg, tags })
  closeIconEditor()
}

// ✅ écoute depuis la sidebar
function handleCreateOpen() {
  showCreate.value = true
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Passe la fonction à la sidebar -->
    <Sidebar @open-create="handleCreateOpen" />

    <div class="flex-1 flex flex-col">
      <HeaderComponent class="border-b border-gray-800" />
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>

  <!-- ✏️ Modale d'édition -->
  <IconEditorModal v-model="isIconEditorOpen" :icons="icons" :categories="categories" :tagSuggestions="tagSuggestions"
    @save="handleSave" />

  <CreateIcon v-model="isCreateIconOpen" :categories="categories" @created="getIcons" />

  <IconDelete v-model="isDeleteIconOpen" :icons="icons" @deleted="handleDeleted" />
</template>
