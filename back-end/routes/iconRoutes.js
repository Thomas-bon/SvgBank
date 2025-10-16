import express from 'express';
import {
    getAllIcons,
    getIconById,
    createIcon,
    updateIcon,
    deleteIcon,
    getAllCategories,
    getCategoryById
} from '../controllers/iconControllers.js';
import { iconValidationRules } from '../validation/iconValidation.js';
import { validateRequest } from '../validation/validateRequest.js';


const router = express.Router();


// 👉 Catégories D'ABORD pour éviter que '/:id' capte 'category'
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);

// Icônes
router.get('/', getAllIcons);
router.post('/', iconValidationRules, validateRequest, createIcon);
router.get('/:id', getIconById);
router.put('/:id', iconValidationRules, validateRequest, updateIcon);
router.delete('/:id', deleteIcon);
export default router;