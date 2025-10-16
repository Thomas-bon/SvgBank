import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Erreur de validation",
            errors: errors.array().map(e => ({
                field: e.param,
                msg: e.msg
            }))
        });
    }
    next();
};
