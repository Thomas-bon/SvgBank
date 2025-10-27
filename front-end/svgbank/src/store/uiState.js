// store/uiState.js
import { ref } from 'vue'

// Modale d'édition
export const isIconEditorOpen = ref(false)
export function openIconEditor() { isIconEditorOpen.value = true }
export function closeIconEditor() { isIconEditorOpen.value = false }

// Modale de création
export const isCreateIconOpen = ref(false)
export function openCreateIcon() { isCreateIconOpen.value = true }
export function closeCreateIcon() { isCreateIconOpen.value = false }

export const isDeleteIconOpen = ref(false)
export function openDeleteIcon() { isDeleteIconOpen.value = true }
export function closeDeleteIcon() { isDeleteIconOpen.value = false }