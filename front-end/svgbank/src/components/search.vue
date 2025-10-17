<script setup>
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  modelValue: String
});
const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue || '');

watch(() => props.modelValue, (val) => {
  inputValue.value = val;
});
watch(inputValue, (val) => {
  emit('update:modelValue', val);
});
</script>

<template>
  <div class="relative w-100">
    <FontAwesomeIcon :icon="faMagnifyingGlass"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input id="search" type="text" placeholder="Rechercher..."
      class="block w-full pl-10 pr-3 py-2 border-2 border-[rgb(24,49,83)] rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[rgb(99,230,190)]"
      v-model="inputValue" />
  </div>
</template>
