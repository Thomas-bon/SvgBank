<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { iconsData } from '../store';
import ViewboxComponent from '@/components/viewbox.vue';

const route = useRoute();
const query = computed(() => route.params.query || '');

const icons = computed(() => {
  const q = query.value.toLowerCase();
  return iconsData.value.filter(icon => {
    return icon.tags && icon.tags.some(tag => tag.toLowerCase().includes(q));
  });
});
</script>

<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl font-semibold mb-2">Résultat pour : "{{ query }}"</h1>

    <div v-if="icons.length === 0" class="text-gray-500 py-8">Aucune icône trouvée.</div>

    <div v-else>
      <ViewboxComponent :icons="icons" />
    </div>
  </div>
</template>
