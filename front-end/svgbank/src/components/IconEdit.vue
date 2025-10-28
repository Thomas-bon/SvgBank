<script setup>
import { ref, computed, watch } from "vue";
import BaseModal from "@/components/updateIcon.vue";
import TagPicker from "@/components/tagPicker.vue";
import CategorySelect from "@/components/CategorySelect.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false }, // v-model ouvert/fermé
  icons: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  tagSuggestions: { type: Array, default: () => [] },
});
const emit = defineEmits(["update:modelValue","save"]);

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit("update:modelValue", v),
});

const selectedIcon = ref(null);

watch(() => isOpen.value, (open) => {
  if (open && !selectedIcon.value && props.icons.length) {
    selectedIcon.value = props.icons[0];
    if (!Array.isArray(selectedIcon.value.tags)) selectedIcon.value.tags = [];
  }
});

const selectedCategoryName = computed(() => {
  const id = selectedIcon.value?.category;
  const hit = props.categories.find(c => c._id === id || c.id === id || c.name === id);
  return hit?.name ?? null;
});

function pickIcon(i) {
  selectedIcon.value = i;
  if (!Array.isArray(i.tags)) i.tags = [];
}
function onSave() {
  if (!selectedIcon.value) return;
  const { _id, name, category, svg, tags } = selectedIcon.value;
  emit("save", { _id, name, category, svg, tags });
}
</script>

<template>
  <BaseModal v-model="isOpen" :panelClass="'w-[85%] max-w-[90%] h-[80%]'">
    <template #header>
      <h2 class="text-lg font-semibold">Modifier l’icône</h2>
    </template>

    <div class="flex justify-between">
      <!-- Liste gauche -->
      <div class="h-140 w-[40%] border-2 border-gray-400 rounded-2xl p-4 overflow-y-auto">
        <ul class="grid grid-cols-3 gap-4">
          <li v-for="i in icons" :key="i._id" @click="pickIcon(i)"
              :class="[
                'flex flex-col items-center justify-between border rounded-xl p-3 cursor-pointer transition-all duration-200',
                selectedIcon && selectedIcon._id === i._id
                  ? 'scale-110 border-[rgb(99,230,190)]'
                  : 'scale-100 bg-gray-50 border-gray-300'
              ]">
            <div :class="selectedIcon && selectedIcon._id === i._id ? 'w-24 h-24' : 'w-16 h-16'"
                 class="flex items-center justify-center"
                 v-html="i.svg"></div>
            <p :class="selectedIcon && selectedIcon._id === i._id ? 'text-[rgb(99,230,190)] font-semibold' : ''"
               class="text-center text-sm font-medium mt-2 text-gray-700 truncate w-full">
              {{ i.name }}
            </p>
          </li>
        </ul>
      </div>

      <!-- Formulaire droite -->
      <div class="h-full w-[55%] border-2 border-gray-300 rounded-2xl p-4">
        <template v-if="selectedIcon">
          <h3 class="text-lg font-semibold mb-4 text-[rgb(99,230,190)]">Icône sélectionnée :</h3>

          <div class="flex flex-col items-center">
            <div class="w-24 h-24 mb-3" v-html="selectedIcon.svg"></div>
            <p class="text-lg font-medium">{{ selectedIcon.name }}</p>
            <p class="text-gray-500 text-sm">{{ selectedCategoryName || selectedIcon.category || '—' }}</p>
          </div>

          <hr class="my-4" />

          <form class="grid gap-2" @submit.prevent="onSave">
            <label class="grid gap-1">
              <span>Nom</span>
              <input v-model.trim="selectedIcon.name" class="border rounded p-2" required />
            </label>

            <label class="grid gap-1">
              <span>Catégorie</span>
              <CategorySelect v-model="selectedIcon.category" :options="categories" placeholder="Choisir une catégorie…" />
              <div class="mt-2 text-sm">
                <template v-if="selectedIcon?.category">
                  <p class="text-gray-700">Catégorie actuelle :
                    <span class="font-semibold text-[rgb(99,230,190)]">{{ selectedCategoryName ?? "Inconnue" }}</span>
                  </p>
                </template>
                <template v-else>
                  <p class="text-gray-400 italic">Aucune catégorie sélectionnée.</p>
                </template>
              </div>
            </label>

            <label class="grid gap-1">
              <span>SVG</span>
              <textarea v-model="selectedIcon.svg" rows="4" class="border rounded p-2" required></textarea>
            </label>

            <label class="grid gap-1">
              <span>Tags</span>
              <TagPicker v-model="selectedIcon.tags" :suggestions="tagSuggestions" placeholder="Rechercher/ajouter un tag…" />
            </label>
          </form>
        </template>

        <template v-else>
          <p class="text-gray-400 text-center mt-10">Clique sur une icône pour la voir ici 👈</p>
        </template>
      </div>
    </div>

    <template #footer>
      <button class="px-3 py-2 rounded-2xl border-[rgb(24,49,83)] border-2 border-b-8 cursor-pointer" @click="isOpen = false">Annuler</button>
      <button class="px-3 py-2 rounded-2xl bg-[rgb(99,230,190)] border-[rgb(24,49,83)] border-2 border-b-8 cursor-pointer" @click="onSave">Enregistrer</button>
    </template>
  </BaseModal>
</template>
