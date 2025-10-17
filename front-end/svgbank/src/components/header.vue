<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SearchComponent from '@/components/search.vue';

const search = ref('');
const router = useRouter();
const route = useRoute();

function onSearchEnter() {
  if (search.value.trim()) {
    router.push({ name: 'Result', params: { query: search.value.trim() } });
    search.value = '';
  }
}

const isHome = computed(() => route.name === 'home');
</script>

<template>
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-6">
                    <RouterLink to="/" class="text-lg font-semibold text-gray-800 flex justify-center items-center gap-1"><img src="../assets/logo.svg" class="h-[25px] inline-block items-center"></img> SvgBank</RouterLink>
                </div>

                <div v-if="!isHome">
                    <form @submit.prevent="onSearchEnter">
                        <SearchComponent v-model="search" />
                    </form>
                </div>
            </div>
        </div>
    </header>
</template>
