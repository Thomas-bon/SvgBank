
<script setup>
import tempcat from '../tempcat.json';
import { iconsData } from '../store';

const iconsByCategory = (catId) => iconsData.value.filter((i) => i.category === catId).length;
</script>

<template>
  <div class="px-4 py-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Categories</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <RouterLink
        v-for="cat in tempcat"
        :key="cat._id"
        :to="`/category/${cat.slug}`"
        class="block"
      >
        <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 h-full flex flex-col justify-between">
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