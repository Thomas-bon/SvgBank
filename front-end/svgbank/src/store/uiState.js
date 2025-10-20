import { ref } from 'vue'

export const isIconEditorOpen = ref(false)

export function openIconEditor () {
  isIconEditorOpen.value = true
}
export function closeIconEditor () {
  isIconEditorOpen.value = false
}
