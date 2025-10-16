import moogoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

export async function connect() {
    try {
        await moogoose.connect(uri);
        console.log("✅ Connexion à la base de données réussie");

    } catch (error) {
        console.log("❌ Erreur de connexion à la base de données :", error);
        process.exit(1);

    } finally {
        console.log("🔌 Déconnexion de la base de données");
        
    }
}

// express validator, valides les champs que je crée dans le model