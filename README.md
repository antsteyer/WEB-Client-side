# WEB-Client-side

## Contributeurs

- Loïc Rose
- Antoine Steyer

## Technologies utilisées

Le front-end a été développé avec le framework [VueJS](https://github.com/vuejs/vue). Les composants graphiques utilisés appartiennent à la bibliothèque [Vuetify](https://vuetifyjs.com/en/).

## Utilisation

Notre front-end est disponible sur heroku à l'adresse suivante :

[https://web-client-side.herokuapp.com/#/home
](https://web-client-side.herokuapp.com/#/home)

Si vous souhaitez lancer notre front-end en local, voici les étapes à suivre:

1. git clone https://github.com/antsteyer/WEB-Client-side
2. cd "le dossier cloné"
3. yarn
4. yarn run serve

Vous pouvez maintenant voir l'application à l'adresse [http://localhost:8080/](http://localhost:8080/).

Il est possible que des requêtes échoues lors de l'utilisation de l'application à cause des CORS policies alors qu'elles sont gérées du côté front-end et du côté back-end. Il suffit alors de rafraichir la page pour renvoyer les requêtes.

## Répartition des tâches

### Loïc ROSE

- Affichage des details d'un produit,
- Affichage des details d'une recette,
- Ajout de la feature pour donner un prix dans un magasin pour un produit,
- Filtre sur les magasins qui ont un produit par distance/prix du produit,
- Ajout de la feature pour faire des commentaires sur une recette,

### Antoine STEYER

- Initialisation de l'architecture du projet VueJS et installation de Vuetify
- Création de la navigation interne à l'application
- Création des listes de produits et de recettes
- Ajout de filtres textuels et par score sur les différentes listes
- Ajout d'une recette dans l'application
