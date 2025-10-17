<template>
    <label for="search" class="sr-only">Rechercher</label>
    <input id="search" type="text" placeholder="Rechercher..."
        class="block pl-3 pr-3 py-2 w-150 border border-gray-200 rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        v-model="inputValue" />
</template>

<script setup>
import { ref, watch } from 'vue';

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