import { Icon } from "../models/icons.js";

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

export async function getIconById(req, res) {
    try {
        const icon = new Icon.findById(req.params.id)
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

