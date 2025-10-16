<script setup>
import SearchComponent from '@/components/search.vue';
</script>

<template>
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-6">
                    <RouterLink to="/" class="text-lg font-semibold text-gray-800">SvgBank</RouterLink>
                </div>

                <div class="flex-1 mx-4">
                    <SearchComponent v-model="search" />
                </div>
            </div>
        </div>
    </header>
</template>