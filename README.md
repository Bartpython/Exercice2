# API7

API locale basee sur `json-server` et `json-server-auth`.

## Prerequis

- Node.js installe
- npm installe

## Installation

Depuis le dossier du projet :

```bash
npm install
```

Cette commande installe les dependances du projet, notamment :

- `json-server`
- `json-server-auth`

## Lancement de l'API

```bash
npm start
```

L'API demarre sur :

```text
http://localhost:3000
```

## Fichiers principaux

- `server.js` : configuration et lancement du serveur
- `db.json` : donnees utilisees par l'API
- `routes.json` : reecriture des routes et protection des ressources
- `package.json` : scripts npm et dependances

## Authentification

### Inscription

```http
POST http://localhost:3000/register
```

Exemple de corps JSON :

```json
{
  "email": "user@example.com",
  "password": "password",
  "name": "User"
}
```

### Connexion

```http
POST http://localhost:3000/login
```

Exemple de corps JSON :

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

La connexion retourne un token JWT a utiliser pour acceder aux routes protegees.

## Routes disponibles

Les routes suivantes sont configurees :

```text
/register -> /users
/login    -> /login
/projects -> route protegee
/tasks    -> route protegee
```

Pour acceder aux routes protegees, ajouter le token JWT dans l'en-tete HTTP :

```http
Authorization: Bearer VOTRE_TOKEN
```

Exemples :

```http
GET http://localhost:3000/projects
GET http://localhost:3000/tasks
```

## Arret du serveur

Dans le terminal ou l'API est lancee, utiliser :

```bash
Ctrl + C
```
