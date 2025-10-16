import { ref } from 'vue';

export const iconsData = ref([]);
export const categoryData = ref([]);

export async function getIcons() {
    const response = await fetch("http://192.168.10.154:4000/api/icons/");
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    const data = await response.json();
    iconsData.value = data;
    console.log(data);
    return data;
}

getIcons();

export async function getCategory() {
    const response = await fetch("http://192.168.10.154:4000/api/icons/category/");
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    const data = await response.json();
    categoryData.value = data;
    console.log(data);
    return data;
}

getCategory();