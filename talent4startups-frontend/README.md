# Projet Talent4Startups 2025

Ce projet est une application web CRUD complète avec un back-end Symfony et un front-end React, développée dans le cadre du projet pratique Talent4Startups 2025.

## Structure du projet

Le projet est divisé en deux parties principales :

- **symfony-backend** : API RESTful développée avec Symfony
- **react-frontend** : Interface utilisateur développée avec React

## Front-end React

Le front-end a été développé avec React et utilise les technologies suivantes :

- React 18
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- React Bootstrap pour les composants UI
- Axios pour les requêtes HTTP

### Fonctionnalités implémentées

- Authentification (connexion/inscription)
- Gestion CRUD complète des produits
- Interface responsive et intuitive
- Données mockées pour le développement

### Installation et démarrage

```bash
# Se positionner dans le dossier du front-end
cd react-frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start

# Ou construire la version de production
npm run build
```

### Utilisation

1. Accédez à l'application via http://localhost:3000
2. Connectez-vous avec les identifiants de test :
   - Email : admin@example.com
   - Mot de passe : password123
3. Vous pouvez également créer un nouveau compte via la page d'inscription

### Intégration future avec le back-end

Le front-end est actuellement configuré pour utiliser des données mockées, mais il est prêt à être connecté à une API RESTful. Pour l'intégration avec le back-end Symfony :

1. Créer un fichier de configuration d'API dans `/src/services/api.js`
2. Remplacer les appels aux fonctions mockées par des appels API
3. Configurer l'URL de base de l'API dans un fichier d'environnement

## Back-end Symfony

Le back-end a été partiellement développé avec Symfony et comprend :

- Structure des entités (User, Product)
- Relations entre entités
- Configuration de base

En raison de problèmes techniques avec la configuration de la base de données, le back-end n'est pas entièrement fonctionnel. Pour le finaliser, il faudra :

1. Résoudre les problèmes de configuration de la base de données
2. Générer les migrations
3. Implémenter les contrôleurs API
4. Configurer la sécurité JWT

## Prochaines étapes

1. Finaliser le back-end Symfony
2. Connecter le front-end React à l'API Symfony
3. Déployer l'application complète

## Crédits

Développé pour le projet pratique Talent4Startups 2025 par EDACY.
