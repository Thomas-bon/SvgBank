<!-- src/components/CategorySelect.vue -->
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },     // _id de la catégorie
  options: { type: Array, default: () => [] },   // [{ _id, name }, ...]
  placeholder: { type: String, default: "Rechercher une catégorie..." },
});
const emit = defineEmits(["update:modelValue"]);

const q = ref("");
const open = ref(false);

const filtered = computed(() => {
  const query = q.value.toLowerCase();
  return props.options.filter(
    (c) => !query || c.name?.toLowerCase().includes(query)
  );
});

function selectCategory(cat) {
  emit("update:modelValue", cat._id); // on renvoie l'ObjectId, attendu par ton backend
  q.value = cat.name ?? "";
  open.value = false;
}

function onFocus() { open.value = true; }
function onBlur() { setTimeout(() => (open.value = false), 120); }
</script>

<template>
  <div class="relative">
    <input
      v-model="q"
      :placeholder="placeholder"
      type="text"
      class="w-full border rounded-lg p-2 outline-none focus:ring-2 ring-blue-500"
      @focus="onFocus"
      @blur="onBlur"
    />

    <div
      v-if="open && filtered.length"
      class="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-auto"
    >
      <ul>
        <li
          v-for="c in filtered"
          :key="c._id"
          class="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between"
          @mousedown.prevent="selectCategory(c)"
        >
          <span>{{ c.name }}</span>
          <span v-if="modelValue === c._id" class="text-blue-600 font-semibold">✓</span>
        </li>
      </ul>
    </div>
  </div>
</template>
