<h1>Test technique - Epsor</h1>

<h2>Technos</h2>
<h3>Front</h3>

-   ReactJS
-   ContextAPI
-   React Router Dom
-   Material UI
-   Dracula Theme
-   Axios
-   Eslint

<h3>Back</h3>

-   NodeJS
-   ExpressJS
-   MongoDB (mongoose)
-   GraphQL
-   GraphQL-tester
-   JWT
-   bcrypt
-   Apollo-server
-   Apollo-server-express
-   Jest

<h2>Utilisation</h2>

1.  Premièrement, entrez le nom d'utilisateur et le mot de passe pour pouvoir se connecter à la base de donnée MongoDB.
2.  Ensuite, dans un premier terminal, allez dans le dossier backend et lancez la commande `yarn install && yarn start`, ce qui lancera le server sur le port 4242, le connectera à la base de donnée et importera le JSON produits dedans.
3.  Enfin, dans un deuxième terminal, allez dans le dossier frontend et lancez la commande `yarn install && yarn start` pour lancer le site sur le port 3000.
4.  Il ne reste plus qu'à aller sur http://localhost:3000/ .

<h2>Tests</h2>
Les tests sont disponibles via la commande `yarn test` dans le dossier backend.
Ils permettent de tester quelques requêtes faites au server.
