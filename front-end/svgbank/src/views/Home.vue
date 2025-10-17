<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { categoryData, iconsData } from '../store';
import SearchComponent from '@/components/search.vue';

const router = useRouter();
const search = ref('');

const iconsByCategory = (catId) => iconsData.value.filter((i) => i.category === catId).length;

function onSearchEnter() {
  if (search.value.trim()) {
    router.push({ name: 'Result', params: { query: search.value.trim() } });
    search.value = '';
  }
}
</script>

<template>
  <div class="w-full h-75 bg-red-500 flex items-center justify-center mb-6">
    <form @submit.prevent="onSearchEnter" class="w-full flex justify-center">
      <SearchComponent v-model="search" />
    </form>
  </div>

  <div class="px-4 py-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Categories</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RouterLink
        v-for="cat in categoryData"
        :key="cat._id"
        :to="`/category/${cat.slug}`"
        class="block"
      >
        <div
          class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-transform transform h-full flex flex-col justify-between"
        >
          <div>
            <h2 class="text-lg font-medium text-gray-800">{{ cat.name }}</h2>
            <p class="text-sm text-gray-500 mt-2 truncate">{{ cat.description }}</p>
          </div>
          <div class="mt-4 text-sm text-gray-600">{{ iconsByCategory(cat._id) }} icons</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
