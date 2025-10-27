import { ref } from 'vue';

export const iconsData = ref([]);
export const categoryData = ref([]);

// --- UI globale (modale éditeur d’icône) ---
export const isIconEditorOpen = ref(false);
export const selectedIconId = ref(null);


// Exemple d'objet icône
// {
//     _id: ObjectId('68f0d38fd21875fc41983b6d'),
//     name: 'home',
//     svg: '<svg viewBox=\'0 0 24 24\'><path d=\'M12 3 2 12h3v9h6v-6h2v6h6v-9h3z\'/></svg>',
//     category: '68f0b1b9d21875fc41983b55',
//     tags: [
//         'home',
//         'accueil',
//         'maison',
//         'dashboard',
//         'plein'
//     ]
// }


export async function getIcons() {
    const response = await fetch("http://127.0.0.1:4000/api/icons/");
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    const data = await response.json();
    iconsData.value = data;
    // console.log(data);
    return data;
}

getIcons();

export async function getCategory() {
    const response = await fetch("http://127.0.0.1:4000/api/icons/category/");
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    const data = await response.json();
    categoryData.value = data;
    // console.log(data);
    return data;
}

getCategory();

export async function createIcon(icon) {
    const response = await fetch("http://127.0.0.1:4000/api/icons/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(icon)
    });
    if (!response.ok) {
        throw new Error('‼️ Erreur lors de la création de l\'icône');
    }
    const data = await response.json();
    iconsData.value.push(data);
    return data;
}

export async function updateIcon(iconId, icon) {
    const response = await fetch(`http://127.0.0.1:4000/api/icons/${iconId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(icon)
    });
    if (!response.ok) {
        throw new Error('‼️ Erreur lors de la mise à jour de l\'icône');
        console.log(error);
    }
    const data = await response.json();
    const index = iconsData.value.findIndex(icon => icon.id === iconId);
    if (index !== -1) {
        iconsData.value.splice(index, 1, data);
    }
    return data;
}

export async function deleteIcon(iconId) {  
    const response = await fetch(`http://127.0.0.1:4000/api/icons/${iconId}/`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error('‼️ Erreur lors de la suppression de l\'icône');
    }
    iconsData.value = iconsData.value.filter(icon => icon.id !== iconId);
}
