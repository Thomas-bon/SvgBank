import express from 'express';
import {
    getAllIcons,
    getIconById,
    createIcon,
    updateIcon,
    // deleteIcon,
    getAllCategories,
    getCategoryById
} from '../controllers/iconControllers.js';

const router = express.Router();


// 👉 Catégories D'ABORD pour éviter que '/:id' capte 'category'
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);

// Icônes
router.get('/', getAllIcons);
router.post('/', createIcon);
router.get('/:id', getIconById);
router.put('/:id', updateIcon);

export default router;