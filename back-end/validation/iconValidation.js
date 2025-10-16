import { body } from "express-validator";

export const iconValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom est requis.')
        .isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères.'),
    body('svg')
        .notEmpty().withMessage('Le SVG est requis.')
        .isString().withMessage('Le SVG doit être une chaîne de caractères.')
        .isLength({ max: 500 }).withMessage('Le SVG ne doit pas dépasser 500 caractères.')
        .custom((value) => {
            if (!value.startsWith('<svg') || !value.endsWith('</svg>')) {
                throw new Error('Le SVG doit commencer par <svg> et se terminer par </svg>.');
            }
            return true;
        }),
    body('category')
        .notEmpty().withMessage('La catégorie est requise.')
        .custom((value) => {value => mongoose.Types.ObjectId.isValidObjectId(value)})
        .withMessage('ID de catégorie invalide.'),
    body('tags')
        .isArray().withMessage('Les tags doivent être un tableau.')
        .custom((tags) => {
            if (tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
                throw new Error('Chaque tag doit être une chaîne de caractères non vide.');
            }
            return true;
        }),
];

