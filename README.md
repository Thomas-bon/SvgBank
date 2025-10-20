# 🧩 SVG Bank Thomas B, Thomas R

## 🚀 Présentation

Ce projet est une **banque d’icônes SVG** organisée par catégories (“collections”).  
Chaque icône est liée à une catégorie et dispose de plusieurs tags pour faciliter la recherche.  
La base de données tourne sous **MongoDB (Docker)** et est accompagnée d’une interface d’administration **Mongo Express**.

---

## ⚙️ Stack technique

- **Docker Desktop (Mac M1/M2/M3/M4)**
- **MongoDB 7**
- **Mongo Express**
- **Node.js** (si tu lances un backend connecté à la base)

---

## 🔧 Installation

### 1️⃣ Prérequis

- macOS avec Docker Desktop installé  
- Git  
- Node.js LTS (ex : 20.x)

Vérifie ton architecture :
```bash
uname -m
# → arm64 (Mac Apple Silicon)
```

---

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/<ton-utilisateur>/<ton-projet>.git
cd <ton-projet>
```

---

### 3️⃣ Configuration de l’environnement

#### `.env.sample`
```env
PORT=PORT
MONGODB_URI=URI
```

Crée ton fichier `.env` :
```bash
cp .env.sample .env
```

Modifie avec :
```env
PORT=3000
MONGODB_URI=mongodb://admin:adminpass@localhost:27017/iconsdb?authSource=admin
```

---

### 4️⃣ Fichier Docker Compose

```yaml
services:
  mongo:
    image: mongo:7
    container_name: mongo-local
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: adminpass
    volumes:
      - ./data/mongo:/data/db

  mongo-express:
    image: mongo-express:1.0.2-20
    container_name: mongo-express
    restart: unless-stopped
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://admin:adminpass@mongo:27017/admin
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: adminpass
    depends_on:
      - mongo
```

---

### 5️⃣ Lancer la base de données

Crée le dossier pour la persistance :
```bash
mkdir -p ./data/mongo
```

Démarre les conteneurs :
```bash
docker compose up -d
```

🟢 Accès rapides :
- **MongoDB** → `mongodb://admin:adminpass@localhost:27017/?authSource=admin`
- **Mongo Express** → [http://localhost:8081](http://localhost:8081)
  - Utilisateur : `admin`
  - Mot de passe : `adminpass`

Arrêter les services :
```bash
docker compose down
```

Réinitialiser complètement :
```bash
docker compose down -v
```

---

## 🗂️ Structure de la base de données

### 🟣 Collection : `collections`

```json
{
  "_id": ObjectId("68f0b1b9d21875fc41983b55"),
  "name": "Plein",
  "slug": "plein",
  "description": "Icônes pleines au tracé simple et lisible, idéales pour les boutons et actions primaires."
}
```

### 🟢 Collection : `icons`

```json
{
  "_id": ObjectId("68f0d38fd21875fc41983b6d"),
  "name": "home",
  "svg": "<svg viewBox='0 0 24 24'><path d='M12 3 2 12h3v9h6v-6h2v6h6v-9h3z'/></svg>",
  "category": "68f0b1b9d21875fc41983b55",
  "tags": ["home", "accueil", "maison", "dashboard", "plein"]
}
```

---

## 🧱 Schéma & Index recommandés

```js
db.collections.createIndex({ slug: 1 }, { unique: true });
db.icons.createIndex({ category: 1 });
db.icons.createIndex({ name: 1 });
db.icons.createIndex({ tags: 1 });
db.icons.createIndex({ name: "text", tags: "text" });
```

---

## 🔍 Exemples de requêtes MongoDB

```js
const c = db.collections.findOne({ slug: "plein" }, { _id: 1 });
db.icons.find({ category: c._id }).toArray();

db.icons.aggregate([
  {
    $lookup: {
      from: "collections",
      localField: "category",
      foreignField: "_id",
      as: "collection"
    }
  },
  { $unwind: "$collection" },
  { $match: { "collection.slug": "plein" } },
  { $project: { name: 1, svg: 1, tags: 1, category: "$collection" } }
]).toArray();
```

---

## 🌱 Exemple de seed

```js
const pleinId = (() => {
  const exist = db.collections.findOne({ slug: "plein" });
  if (exist) return exist._id;
  const ins = db.collections.insertOne({
    name: "Plein",
    slug: "plein",
    description: "Icônes pleines au tracé simple et lisible, idéales pour les boutons et actions primaires."
  });
  return ins.insertedId;
})();

db.icons.insertOne({
  name: "home",
  svg: "<svg viewBox='0 0 24 24'><path d='M12 3 2 12h3v9h6v-6h2v6h6v-9h3z'/></svg>",
  category: pleinId,
  tags: ["home", "accueil", "maison", "dashboard", "plein"]
});
```

---

## 🧭 Connexion backend Node.js

```js
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB:", err));
```

---

## 📚 Commandes utiles

```bash
docker compose up -d
docker ps
docker compose logs -f mongo
docker exec -it mongo-local mongosh -u admin -p adminpass
docker compose down
docker compose down -v
```

---

## 🔒 Sécurité (production)

```js
use iconsdb
db.createUser({
  user: "appUser",
  pwd: "motdepassefort",
  roles: [{ role: "readWrite", db: "iconsdb" }]
});
```

---

## 🗂️ Arborescence conseillée

```
.
├── data/
│   └── mongo/
├── docker-compose.yml
├── .env
├── .env.sample
└── README.md
```

---

## ✨ Auteur

Projet développé par **Nathan Boudet**  
Étudiant en DNMADE Développement Web & Multimédia  
> Banque d’icônes SVG — MongoDB + Docker Setup
