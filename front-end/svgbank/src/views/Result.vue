<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { iconsData } from '../store';
import Viewbox from '@/components/viewbox.vue';
import Modal from '@/components/modal.vue';

const route = useRoute();
const query = computed(() => route.params.query || '');

const icons = computed(() => {
  const q = query.value.toLowerCase();
  return iconsData.value.filter(icon =>
    icon.tags && icon.tags.some(tag => tag.toLowerCase().includes(q))
  );
});

const selectedIcon = ref(null);
const showModal = ref(false);

function handleIconClick(icon) {
  selectedIcon.value = icon;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  selectedIcon.value = null;
}
</script>

<template>
  <div class="px-4 py-6 bg-[rgb(240,241,243)] h-full">
    <h1 class="text-2xl font-semibold mb-2">Résultat pour : "{{ query }}"</h1>

    <div v-if="icons.length === 0" class="text-gray-500 py-8">
      Aucune icône trouvée.
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      <Viewbox
        v-for="icon in icons"
        :key="icon._id"
        :icon="icon"
        @click="handleIconClick"
      />
    </div>

    <Modal
      v-if="selectedIcon"
      :icon="selectedIcon"
      :show="showModal"
      @close="closeModal"
    />
  </div>
</template>
