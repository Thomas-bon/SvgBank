# 🧩 SVG Bank

## 🚀 Présentation

**SvgBank** est une application web permettant de gérer une **banque d’icônes SVG** classées par catégories et consultables par tags.  
La base de données repose sur **MongoDB**, exécutée dans un conteneur Docker, avec une interface d’administration **Mongo Express**.  
Le **front-end** est développé avec **Vue.js 3** et **Tailwind CSS** pour une interface moderne et réactive.

---

## ⚙️ Stack technique

- **Docker Desktop (Mac M1/M2/M3/M4)**
- **MongoDB 7**
- **Mongo Express**
- **Node.js (Backend API)**
- **Vue 3 + Vite**
- **Tailwind CSS**

---

## 🔧 Installation

### 1️⃣ Prérequis

- macOS avec **Docker Desktop** installé  
- **Git**  
- **Node.js LTS (ex : 20.x)**  

Vérifie ton architecture :
```bash
uname -m
# → arm64 (Mac Apple Silicon)
```

---

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/Thomas-bon/SvgBank.git
cd SvgBank
```

---

### 3️⃣ Fichier d’environnement

#### `.env.sample`
```env
PORT=PORT
MONGODB_URI=URI
```

Crée ton fichier `.env` :
```bash
cp .env.sample .env
```

Modifie avec les valeurs locales :
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
      # Connexion à MongoDB
      ME_CONFIG_MONGODB_URL: mongodb://admin:adminpass@mongo:27017/admin

      # Authentification web
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: adminpass

    depends_on:
      - mongo
```

---

### 5️⃣ Démarrer la base de données

Crée le dossier de volume :
```bash
mkdir -p ./data/mongo
```

Lance les conteneurs :
```bash
docker compose up -d
```

🟢 Accès rapides :
- **MongoDB** → `mongodb://admin:adminpass@localhost:27017/?authSource=admin`
- **Mongo Express** → [http://localhost:8081](http://localhost:8081)  
  (Login : `admin` | Mot de passe : `adminpass`)

Arrêter :
```bash
docker compose down
```

Réinitialiser (supprime les données locales) :
```bash
docker compose down -v
```

---

## 🗂️ Structure de la base de données

### 📁 Collection : `collections`
```json
{
  "_id": ObjectId("68f0b1b9d21875fc41983b55"),
  "name": "Plein",
  "slug": "plein",
  "description": "Icônes pleines au tracé simple et lisible, idéales pour les boutons et actions primaires."
}
```

### 🧩 Collection : `icons`
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

## 🎨 Partie Front-end (Vue + Tailwind)

Le front-end se trouve dans le dossier :
```
front-end/svgbank
```

### Installation
Depuis la racine du projet :
```bash
cd front-end/svgbank
npm install
```

### Lancer le serveur de développement
```bash
npm run dev
```

L’application sera accessible à l’adresse indiquée dans le terminal (en général : [http://localhost:5173](http://localhost:5173)).

Assure-toi que la base MongoDB est bien démarrée avant de lancer le front.

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

## ✨ Auteur

Projet développé par **Thomas BONANSEA** & **Thomas RICHARD**  
Étudiants en DNMADE option Numérique  
> Projet GitHub : [SvgBank](https://github.com/Thomas-bon/SvgBank)
