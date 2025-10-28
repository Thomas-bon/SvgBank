<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { openIconEditor, openCreateIcon, openDeleteIcon } from '../store/uiState.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faUpload, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const router = useRouter()

const STORAGE_KEY = 'sidebar:isOpen'
const isOpen = ref(false)


onMounted(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw !== null) isOpen.value = raw === 'true'
})

watch(isOpen, (v) => {
    localStorage.setItem(STORAGE_KEY, String(v))
})

function toggle() {
    isOpen.value = !isOpen.value
}

const icons = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
}

const itemsTop = [
    { label: 'Accueil', icon: faHouse, onClick: () => console.log('Accueil') },
]

const itemsBottom = [
    { label: 'Uploader une icône', icon: faUpload, onClick: () => openCreateIcon() },
    { label: 'Modifier une icône', icon: faPenToSquare, onClick: () => openIconEditor() },
    { label: 'Supprimer une icône', icon: faTrash, onClick: () => openDeleteIcon() },
]


</script>


<template>
    <aside
        class="relative h-screen bg-[rgb(24,49,83)] text-white flex flex-col border-r border-gray-800 transition-all duration-300 ease-in-out"
        :class="isOpen ? 'w-64' : 'w-16'" :aria-expanded="isOpen.toString()" style="color: white !important;">

        <button
            class="absolute cursor-pointer -right-3 top-4 z-10 h-6 w-6 rounded-full bg-[rgb(24,49,83)] border border-gray-700 shadow flex items-center justify-center focus:outline-none focus:ring focus:ring-[rgb(99,230,190)] text-white"
            @click="toggle()" :aria-label="isOpen ? 'Réduire la barre latérale' : 'Déplier la barre latérale'">
            <svg class="h-4 w-4 transition-transform duration-300" :class="isOpen ? 'rotate-0' : 'rotate-180'"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>

        <div class="flex items-center gap-3 px-3 py-4 border-b border-gray-800">
            <div class="h-8 w-8 rounded-lg bg-[rgb(99,230,190)] flex items-center justify-center font-bold">S</div>
            <div class="text-sm font-semibold truncate transition-opacity duration-200"
                :class="isOpen ? 'block' : 'hidden pointer-events-none'">
                SvgBank
            </div>
        </div>

        <nav class="mt-2 flex-1 overflow-y-auto px-2">
            <ul class="space-y-1">
                <li v-for="item in itemsTop" :key="item.label">
                    <button
                        class="group w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-[rgb(99,230,190)]/50 text-white"
                        @click="item.onClick?.()">

                        <FontAwesomeIcon :icon="item.icon" class="w-5 h-5 text-white" />

                        <span class="whitespace-nowrap transition-all duration-200"
                            :class="isOpen ? 'block translate-x-0' : 'hidden -translate-x-2 pointer-events-none'">
                            {{ item.label }}
                        </span>

                        <span v-if="item.badge !== undefined"
                            class="ml-auto text-xs rounded px-2 py-0.5 bg-gray-800 text-white transition-opacity duration-200"
                            :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'">
                            {{ item.badge }}
                        </span>

                        <span v-if="!isOpen"
                            class="absolute left-16 z-20 origin-left scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 bg-gray-800/95 text-xs px-2 py-1 rounded shadow border border-gray-700 text-white">
                            {{ item.label }}
                        </span>
                    </button>
                </li>
            </ul>
        </nav>

        <div class="mt-auto p-2 border-t border-white space-y-1 list-none">
            <li v-for="item in itemsBottom" :key="item.label">
                <button
                    class="group cursor-pointer w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-800 focus:outline-none focus:ring focus:ring-[rgb(99,230,190)] text-white"
                    @click="item.onClick?.()">
                    
                    <FontAwesomeIcon :icon="item.icon" class="w-5 h-5 text-white" />

                    <span class="whitespace-nowrap transition-all duration-200"
                        :class="isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'">
                        {{ item.label }}
                    </span>
                    
                    <span v-if="!isOpen"
                        class="absolute left-16 z-20 origin-left scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 bg-gray-800/95 text-xs px-2 py-1 rounded shadow border border-gray-700 text-white">
                        {{ item.label }}
                    </span>
                </button>
            </li>
        </div>
    </aside>
</template>