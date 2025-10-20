<script setup>
import { computed, ref, onMounted } from "vue";
import IconEditorModal from "@/components/IconEditorModal.vue";
import { iconsData, categoryData, getIcons, getCategory, updateIcon } from "@/store";

const icons = computed(() => iconsData.value);
const categories = computed(() => Array.isArray(categoryData.value) ? categoryData.value : []);
const tagSuggestions = computed(() => {
  const s = new Set();
  for (const ic of icons.value || []) for (const t of ic?.tags || []) s.add(String(t).toLowerCase());
  return Array.from(s).sort();
});

const isEditOpen = ref(false);

onMounted(() => {
  getIcons();
  getCategory();
});

async function handleSave({ _id, name, category, svg, tags }) {
  await updateIcon(_id, { name, category, svg, tags });
  isEditOpen.value = false;
}
</script>

<template>
  <section class="p-9">
    <h1 class="text-xl font-semibold mb-4">🧪 Page de test</h1>

    <button class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer" @click="isEditOpen = true">
      ✏️ Modifier l’icône
    </button>

    <IconEditorModal
      v-model="isEditOpen"
      :icons="icons"
      :categories="categories"
      :tagSuggestions="tagSuggestions"
      @save="handleSave"
    />
  </section>
</template>
