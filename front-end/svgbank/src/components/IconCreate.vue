<script setup>
import { ref, computed } from "vue";
import BaseModal from "@/components/updateIcon.vue"; 
import TagPicker from "@/components/tagPicker.vue";
import CategorySelect from "@/components/CategorySelect.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false }, // v-model ouvert/fermé
  categories: { type: Array, default: () => [] },
  tagSuggestions: { type: Array, default: () => [] },
});
const emit = defineEmits(["update:modelValue","created"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit("update:modelValue", v),
});

// Nouvelle icône à créer
const newIcon = ref({
  name: "",
  category: null,
  svg: "",
  tags: [],
});

// Pour afficher le nom de la catégorie
const selectedCategoryName = computed(() => {
  const id = newIcon.value.category;
  const hit = props.categories.find(c => c._id === id || c.id === id || c.name === id);
  return hit?.name ?? null;
});

// Sauvegarde
function onSave() {
  if (!newIcon.value.name || !newIcon.value.svg || !newIcon.value.category) return;
  emit("created", { ...newIcon.value });
  // reset du formulaire
  newIcon.value = { name: "", category: null, svg: "", tags: [] };
  isOpen.value = false;
}
</script>

<template>
  <BaseModal v-model="isOpen" :panelClass="'w-[50%] max-w-[600px] h-auto'">
    <template #header>
      <h2 class="text-lg font-semibold">Créer une nouvelle icône</h2>
    </template>

    <div class="p-4">
      <form class="grid gap-4" @submit.prevent="onSave">
        <label class="grid gap-1">
          <span>Nom</span>
          <input v-model.trim="newIcon.name" class="border rounded p-2" required />
        </label>

        <label class="grid gap-1">
          <span>Catégorie</span>
          <CategorySelect v-model="newIcon.category" :options="categories" placeholder="Choisir une catégorie…" />
          <div class="mt-1 text-sm text-gray-500">
            Catégorie actuelle : <span class="font-semibold">{{ selectedCategoryName || "—" }}</span>
          </div>
        </label>

        <label class="grid gap-1">
          <span>SVG</span>
          <textarea v-model="newIcon.svg" rows="4" class="border rounded p-2" required placeholder="<svg>...</svg>"></textarea>
        </label>

        <label class="grid gap-1">
          <span>Tags</span>
          <TagPicker v-model="newIcon.tags" :suggestions="tagSuggestions" placeholder="Rechercher/ajouter un tag…" />
        </label>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" class="px-3 py-2 rounded bg-gray-200" @click="isOpen = false">Annuler</button>
          <button type="submit" class="px-3 py-2 rounded bg-blue-600 text-white">Créer</button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>
