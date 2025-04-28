# Quiz Éducatif - Plateforme de Gestion de Quiz en Temps Réel

## Prérequis
- Docker et Docker Compose installés
- Node.js 18+
- npm 9+

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-repo/quiz-platform.git
cd quiz-platform
```

### 2. Installer les dépendances
```bash
# Frontend (Angular)
npm install

# Backend (Node.js)
cd server && npm install && cd ..
```

### 3. Configurer l'environnement
Copier le fichier `.env.example` et le renommer en `.env` :
```bash
cp server/.env.example server/.env
```

## Exécution avec Docker
```bash
docker-compose up --build
```

Les services seront accessibles sur :
- Frontend : http://localhost:4200
- Backend : http://localhost:3000
- LocalStack : http://localhost:4566

## Exécution sans Docker

### 1. Démarrer LocalStack
```bash
docker-compose up localstack
```

### 2. Démarrer le backend
```bash
cd server
npm start
```

### 3. Démarrer le frontend
```bash
npm start
```

## Structure du Projet
```
.
├── docker-compose.yml          # Configuration Docker
├── localstack/                 # Scripts d'initialisation LocalStack
├── server/                     # Backend Node.js
│   ├── routes/                 # Routes API
│   ├── tests/                  # Tests unitaires
│   └── server.js               # Serveur principal
└── src/                        # Frontend Angular
    ├── app/                    
    │   ├── auth/               # Module d'authentification
    │   ├── quiz/               # Module de quiz
    │   ├── shared/             # Modules partagés
    │   └── core/               # Services principaux
    └── assets/                 # Ressources statiques
```

## Fonctionnalités
- Authentification (Login/Register)
- Création et gestion de quiz
- Sessions de quiz en temps réel
- Résultats et statistiques

## Données de Test
- Email : `test@example.com`
- Mot de passe : `TEST`

## Commandes Utiles
```bash
# Lancer les tests
cd server && npm test

# Vérifier le linting
cd server && npm run lint

# Reconstruire les containers
docker-compose down && docker-compose up --build
```

## Technologies Utilisées
- **Frontend** : Angular 18
- **Backend** : Node.js, Express
- **Base de données** : DynamoDB (via LocalStack)
- **Infrastructure** : Docker, LocalStack
- **Tests** : Jest, Supertest

## Licence
MIT
