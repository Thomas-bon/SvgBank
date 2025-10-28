<!-- src/components/TagPicker.vue -->
<script setup>
import { ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: { type: Array, default: () => [] },      // tags sélectionnés
  suggestions: { type: Array, default: () => [] },      // tags possibles
  placeholder: { type: String, default: "Rechercher un tag..." },
  maxSuggestions: { type: Number, default: 8 },
  allowNew: { type: Boolean, default: true },           // autoriser la création d’un nouveau tag
});
const emit = defineEmits(["update:modelValue", "add", "remove"]);

const q = ref("");
const open = ref(false);
const inputEl = ref(null);

// Normalisation très simple
const norm = (s) => s.trim().replace(/\s+/g, " ").toLowerCase();

// Liste filtrée (et retire ceux déjà sélectionnés)
const filtered = computed(() => {
  const query = norm(q.value);
  const selected = new Set((props.modelValue || []).map(norm));
  let list = props.suggestions
    .filter(t => !selected.has(norm(t)))
    .filter(t => !query || norm(t).includes(query));
  if (props.maxSuggestions > 0) list = list.slice(0, props.maxSuggestions);
  return list;
});

// Ajouter un tag
function addTag(tagText) {
  const tag = norm(tagText);
  if (!tag) return;
  const exists = (props.modelValue || []).some(t => norm(t) === tag);
  if (exists) return; // pas de doublon
  const next = [...props.modelValue, tag];
  emit("update:modelValue", next);
  emit("add", tag);
  q.value = "";
  nextTick(() => inputEl.value?.focus());
  open.value = false;
}

// Retirer un tag (par valeur)
function removeTag(tag) {
  const next = props.modelValue.filter(t => norm(t) !== norm(tag));
  emit("update:modelValue", next);
  emit("remove", tag);
}

// Gestion clavier sur l’input
function onKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    if (filtered.value.length) addTag(filtered.value[0]);
    else if (props.allowNew && q.value.trim()) addTag(q.value);
  } else if (e.key === "Backspace" && !q.value && props.modelValue.length) {
    // supprime le dernier tag si input vide
    removeTag(props.modelValue[props.modelValue.length - 1]);
  } else if (e.key === "Escape") {
    open.value = false;
  }
}

// Ouvrir/fermer le menu selon focus
function onFocus() { open.value = true; }
function onBlur() { setTimeout(() => (open.value = false), 120); } // laisse le temps au clic
</script>

<template>
  <div class="w-full">
    <div
      class="flex flex-wrap gap-2 border-[rgb(195,198,209)] border-2 rounded-2xl p-2 focus-within:ring-2 ring-[rgb(99,230,190)] bg-white"
      @click="inputEl?.focus()"
    >
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="inline-flex items-center gap-2 bg-[#ffd43b] text-[rgb(24,49,83)] px-2 py-1 rounded-full text-sm"
      >
        {{ tag }}
        <button
          type="button"
          class="text-[rgb(24,49,83)]"
          @click.stop="removeTag(tag)"
          aria-label="Retirer"
        >
          ✕
        </button>
      </span>

      <input
        ref="inputEl"
        v-model="q"
        type="text"
        :placeholder="placeholder"
        class="flex-1 min-w-[160px] outline-none px-1 py-1"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <div
      v-if="open && (filtered.length || (allowNew && q.trim()))"
      class="mt-2 border-[rgb(195,198,209)] border-2 rounded-2xl bg-white max-h-64 overflow-auto"
    >
      <ul>
        <li
          v-for="s in filtered"
          :key="s"
          class="px-3 py-2 hover:bg-[rgb(195,198,209)] cursor-pointer flex justify-between items-center"
          @mousedown.prevent="addTag(s)"
        >
          <span>{{ s }}</span>
          <span class="text-xs text-gray-500">Ajouter</span>
        </li>

        <li
          v-if="allowNew && q.trim() && !filtered.length"
          class="px-3 py-2 hover:bg-[rgb(195,198,209)] cursor-pointer flex justify-between items-center"
          @mousedown.prevent="addTag(q)"
        >
          <span>Créer “{{ norm(q) }}”</span>
          <span class="text-xs text-gray-500">Nouveau</span>
        </li>
      </ul>
    </div>
  </div>
</template>
