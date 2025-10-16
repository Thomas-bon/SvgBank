import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './connexion.js';
import iconRoutes from '../routes/iconRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',  
}));

await connect();

app.get("/", (req, res) => res.send("API SVG Bank en ligne ✅"));

app.use("/api/icons", iconRoutes);

const PORT = process.env.PORT || 4000;
app.listen( PORT, "0.0.0.0", () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});