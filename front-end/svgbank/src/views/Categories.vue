<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { categoryData, iconsData } from '../store';
import Viewbox from '@/components/viewbox.vue';
import Modal from '@/components/modal.vue';

const route = useRoute();
const category = computed(() =>
    categoryData.value.find(cat => cat.slug === route.params.slug)
);

const icons = computed(() =>
    iconsData.value.filter(icon => icon.category === category.value?._id)
);

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
        <div v-if="category">
            <h1 class="text-2xl font-semibold mb-2">{{ category.name }}</h1>
            <p class="text-sm text-gray-600 mb-6">{{ category.description }}</p>
        </div>
        <div v-else>
            <h1 class="text-xl">Catégorie non trouvée</h1>
        </div>

        <div v-if="icons.length > 0" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <Viewbox v-for="icon in icons" :key="icon._id" :icon="icon" @click="handleIconClick" />
        </div>

        <Modal v-if="selectedIcon" :icon="selectedIcon" :show="showModal" @close="closeModal" />
    </div>
</template>
