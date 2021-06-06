Piquante - Projet 6 Développeur web - OpenClassrooms
====================================================

Pour tester le back-end de cette application, vous devez proceder en deux temps :
- installer le front-end
- installer le back-end

Installation du front-end
-------------------------
Allez à l'adresse suivante, puis suivez les instructions :  
https://github.com/OpenClassrooms-Student-Center/dwj-projet6

> **Attention :** Selon votre version de Node.JS, le plugin "node-sass" pourrait ne pas fonctionner et faire planter le build. Sur la version 14.17.0 de Node.JS, il est recommandé d'installer la version 4.14+ de "node-sass"

Installation du back-end
------------------------
Créez un nouveau dossier, puis depuis celui-ci, clonez ce dépôt en collant cette commande dans votre terminal :
    
    git clone https://github.com/raphael-carre/RaphaelCarre_5_05052021.git ./ && npm install

Après l'installation, vous devez créer un fichier comportant des variables d'environnement à la racine du dossier :

    touch ./.env

Completez ce fichier avec les clés suivantes, puis sauvegardez :

    PORT=3000
    ALLOWED_ORIGIN=http://localhost:4200

    DB_USERNAME='nom_d_utilisateur'
    DB_PASSWORD='mot_de_passe'
    DB_NAME='nom_de_la_base_de_donnees'

    TOKEN_SECRET='votre_token_personnalise'
    AES_BASE_STRING='votre_cle_pour_le_cryptage_des_emails'

Enfin, lancez la commande suivante :

    npm start

Le back-end est opérationnel !  

Une fois le front-end lancé, vous pouvez tester l'application depuis l'adresse http://localhost:4200/ !

***

Informations complémentaires
----------------------------
Vous pouvez tester directement l'API avec Postman ou l'extension Thunder Client de VSCode en utilisant l'adresse http://localhost:3000/.  

Vous pouvez également consulter la documentation de l'API en vous rendant à la même adresse depuis votre navigateur. (Ne fonctionne pas avec Safari)

