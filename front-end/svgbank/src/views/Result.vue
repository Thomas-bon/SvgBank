<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { iconsData } from '../store';

const route = useRoute();
const query = computed(() => route.params.query || '');
const icons = computed(() =>
  iconsData.value.filter(icon => icon.name.toLowerCase().includes(query.value.toLowerCase()))
);
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-semibold mb-2">Résultat pour : "{{ query }}"</h1>
    <div v-if="icons.length === 0" class="text-gray-500 py-8">Aucune icônes trouvée.</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      <div
        v-for="icon in icons"
        :key="icon._id"
        class="bg-white rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
      >
        <div class="w-14 h-14 mb-3 flex items-center justify-center">
          <div class="w-full h-full" v-html="icon.svg"></div>
        </div>
        <div class="text-sm text-gray-700 truncate w-full">{{ icon.name }}</div>
      </div>
    </div>
  </div>
</template>
