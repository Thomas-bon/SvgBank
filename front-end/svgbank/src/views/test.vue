<script setup>
import { computed, ref } from "vue";
import BaseModal from "@/components/updateIcon.vue";
import TagPicker from "@/components/tagPicker.vue";
import CategorySelect from "@/components/CategorySelect.vue";
import { iconsData, updateIcon, categoryData } from "../store/"


const icons = computed(() => iconsData.value)
const categories = computed(() =>
  Array.isArray(categoryData.value) ? categoryData.value : []
);

const tagSuggestions = computed(() => {
    const set = new Set();
    for (const ic of icons.value || []) {
        for (const t of ic?.tags || []) set.add(t.toLowerCase());
    }
    return Array.from(set).sort();
});


const icon = ref({
    _id: "670f8dfbb6789d78a6c6e221",
    name: "Facebook",
    category: "Réseaux sociaux",
    svg: "<svg>...</svg>",
    tags: [
        'home',
        'accueil',
        'maison',
        'dashboard',
        'plein'
    ],
});



const selectedIcon = ref(null);
const isEditOpen = ref(false);
const saving = ref(false);
const category = ref([]);

async function saveIcon() {
    if (!selectedIcon.value) return;

    try {
        saving.value = true;
        const { _id, name, category, svg, tags } = selectedIcon.value;
        await updateIcon(_id, { name, category, svg, tags });

    } catch (error) {
        console.error(error);
        alert(error.message || "Erreur lors de la mise à jour.");
    } finally {
        saving.value = false;
    }
}

</script>

<template>
    <section class="p-9">
        <h1 class="text-xl font-semibold mb-4">🧪 Page de test</h1>

        <!-- bouton qui ouvre la popup d’édition -->
        <!-- <button class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer" @click="isEditOpen = true">
            ✏️ Modifier l’icône
        </button> -->

        <!-- MODAL GÉNÉRIQUE réutilisable -->
        <BaseModal v-model="isEditOpen" :panelClass="'w-[85%] max-w-[90%] h-[80%]'">
            <template #header>
                <h2 class="text-lg font-semibold">Modifier l’icône</h2>
            </template>
            <div class="flex justify-between">
                <div class="h-140 w-[40%] border-2 border-gray-400 rounded-2xl p-4 overflow-y-auto">
                    <ul class="grid grid-cols-3 gap-4">
                        <li v-for="i in icons" :key="i._id" @click="selectedIcon = i" :class="[
                            'flex flex-col items-center justify-between border rounded-xl p-3 cursor-pointer transition-all duration-200',
                            selectedIcon && selectedIcon._id === i._id
                                ? 'scale-110 bg-blue-100 border-blue-500 shadow-md'
                                : 'scale-100 bg-gray-50 hover:bg-blue-50 border-gray-300'
                        ]">
                            <div class="flex items-center justify-center"
                                :class="selectedIcon && selectedIcon._id === i._id ? 'w-24 h-24' : 'w-16 h-16'"
                                v-html="i.svg">
                            </div>

                            <p class="text-center text-sm font-medium mt-2 text-gray-700 truncate w-full"
                                :class="selectedIcon && selectedIcon._id === i._id ? 'text-blue-700 font-semibold' : ''">
                                {{ i.name }}
                            </p>
                        </li>
                    </ul>
                </div>

                <div class="h-full w-[55%] border-2 border-gray-300 rounded-2xl p-4">
                    <template v-if="selectedIcon">
                        <h3 class="text-lg font-semibold mb-4 text-blue-600">Icône sélectionnée :</h3>

                        <div class="flex flex-col items-center">
                            <div class="w-24 h-24 mb-3" v-html="selectedIcon.svg"></div>
                            <p class="text-lg font-medium">{{ selectedIcon.name }}</p>
                        </div>

                        <hr class="my-4" />

                        <form class="grid gap-2">
                            <label class="grid gap-1">
                                <span>Nom</span>
                                <input v-model.trim="selectedIcon.name" class="border rounded p-2" required />
                            </label>

                            <label class="grid gap-1">
                                <span>Catégorie</span>

                                <!-- Sélecteur de catégorie -->
                                <CategorySelect v-model="selectedIcon.category" :options="categories"
                                    placeholder="Choisir une catégorie…" />

                                <!-- Liste ou nom de la catégorie actuelle -->
                                <div class="mt-2 text-sm">
                                    <template v-if="selectedIcon?.category">
                                        <p class="text-gray-700">
                                            Catégorie actuelle :
                                            <span class="font-semibold text-blue-700">
                                                {{categories.find(c => c._id === selectedIcon.category)?.name ||
                                                "Inconnue" }}
                                            </span>
                                        </p>
                                    </template>
                                    <template v-else>
                                        <p class="text-gray-400 italic">Aucune catégorie sélectionnée.</p>
                                    </template>
                                </div>

                                <small class="text-gray-500">
                                    Tape pour filtrer, clique pour sélectionner.
                                </small>
                            </label>


                            <label class="grid gap-1">
                                <span>SVG</span>
                                <textarea v-model="selectedIcon.svg" rows="4" class="border rounded p-2"
                                    required></textarea>
                            </label>

                            <label class="grid gap-1">
                                <span>Tags</span>
                                <!-- v-model = selectedIcon.tags (tableau) ; suggestions = tagSuggestions -->
                                <TagPicker v-if="selectedIcon" v-model="selectedIcon.tags" :suggestions="tagSuggestions"
                                    placeholder="Rechercher/ajouter un tag…" />
                                <small class="text-gray-500">
                                    Tape pour filtrer. Entrée pour ajouter. Clique sur un tag pour l’ajouter.
                                </small>
                            </label>
                        </form>
                    </template>

                    <template v-else>
                        <p class="text-gray-400 text-center mt-10">Clique sur une icône pour la voir ici 👈</p>
                    </template>
                </div>
            </div>

            <template #footer>
                <button class="px-3 py-2 rounded bg-gray-200 cursor-pointer"
                    @click="isEditOpen = false">Annuler</button>
                <button class="px-3 py-2 rounded bg-blue-600 text-white cursor-pointer"
                    @click="saveIcon">Enregistrer</button>
            </template>
        </BaseModal>
    </section>
</template>

