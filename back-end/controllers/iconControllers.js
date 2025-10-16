import { Icon } from "../models/icons.js";
import { Category } from "../models/category.js";

// Récupérer toutes les icones
export async function getAllIcons(req, res) {
    try {
        const icons = await Icon.find();
        res.json(icons);
        console.log("✅ Récupération de toutes les icones réussie");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des icones : ", error);
        res.status(500).json({ message: error.message });
    }
}

// Récupérer une icone par son ID
export async function getIconById(req, res) {
    try {
        const icon = await Icon.findById(req.params.id)
        res.json(icon);
        console.log("✅ Récupération de toutes les icones réussie");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des icones : ", error);
        res.status(500).json({ message: error.message });
    }

}


// Créer une nouvelle icone
export async function createIcon(req, res) {
    try {
        const icon = new Icon(req.body);
        await icon.save();
        res.status(201).json(icon);
        console.log("✅ Icon crée avec succès : ", icon);
    } catch (error) {
        console.error("❌ Erreur lors de la création de l'icon : ", error);
        res.status(500).json({ message: error.message });
    }
}


export async function updateIcon(req, res) {
    try {
        const icon = await Icon.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!icon) {
            console.error("❌ Erreur lors de la mise à jour de l'icon : ", error);
            return res.status(404).json({ message: "😔 Icone non trouvée.." })
        }

        res.json(icon)
        console.log("✅ Icon mise à jour avec succès : ", icon);
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour de l'icon : ", error);
        res.status(500).json({ message: error.message });
    }
}

// Supprimer une icone
export async function deleteIcon(req, res) {
    try {
        const icon = await Icon.findByIdAndDelete(req.params.id);

        if (!icon) {
            return res.status(404).json({ message: "Icone non trouvée." });
        }

        res.json({ message: "✅ Icone supprimée avec succès.", icon });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression de l'icone : ", error);
        res.status(500).json({ message: error.message });
    }
}

// Récupérer toutes les catégories
export async function getAllCategories(req, res) {
    try {
        const category = await Category.find()
        res.json(category)
        console.log("✅ Récupération de toutes les catégories réussie");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des catégories : ", error);
        res.status(500).json({ message: error.message });
    }
}

// Récupérer une catégorie par son ID
export async function getCategoryById(req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.json(category);
        console.log("✅ Récupération de toutes les catégories réussie");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des catégories : ", error);
        res.status(500).json({ message: error.message });
    }

}