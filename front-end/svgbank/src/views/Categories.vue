<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { categoryData } from '../store';
import { iconsData } from '../store';

const props = defineProps({
    iconId: {
        type: [String, Number],
        required: false,
    },
});

const route = useRoute();

const category = computed(() => categoryData.value.find((cat) => cat.slug === route.params.slug));
const icons = computed(() => iconsData.value.filter((icon) => icon.category === category.value?._id));
</script>

<template>
    <div class="px-4 py-6">
        <div v-if="category">
            <h1 class="text-2xl font-semibold mb-2">{{ category.name }}</h1>
            <p class="text-sm text-gray-600 mb-6">{{ category.description }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
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
        <div v-else>
            <h1 class="text-xl">Catégorie non trouvée</h1>
        </div>
    </div>
</template>