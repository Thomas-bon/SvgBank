<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { categoryData } from '../store';
import ViewboxComponent from '@/components/viewbox.vue';

const props = defineProps({
    iconId: {
        type: [String, Number],
        required: false,
    },
});

const route = useRoute();

const category = computed(() => categoryData.value.find((cat) => cat.slug === route.params.slug));
</script>

<template>
    <div class="px-4 py-6">
        <div v-if="category">
            <h1 class="text-2xl font-semibold mb-2">{{ category.name }}</h1>
            <p class="text-sm text-gray-600 mb-6">{{ category.description }}</p>
        </div>
        <div v-else>
            <h1 class="text-xl">Catégorie non trouvée</h1>
        </div>
        
        <ViewboxComponent></ViewboxComponent>
    </div>
</template>