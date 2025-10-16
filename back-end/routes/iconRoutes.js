import express from 'express';
import {
    getAllIcons,
    // getIconById,
    createIcon,
    // updateIcon,
    // deleteIcon
} from '../controllers/iconControllers.js';

const router = express.Router();

// Routes pour les icônes
router.get('/', getAllIcons);
// router.get('/:id', getIconById);
router.post('/', createIcon);
// router.put('/:id', updateIcon);
// router.delete('/:id', deleteIcon);

export default router;