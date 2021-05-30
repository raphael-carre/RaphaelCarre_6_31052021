import mongoose from 'mongoose'

/**
 * Database class
 */
export default class Database {
    /**
     * @property {String} userName User name
     * @property {String} password User password
     * @property {String} dbName Database name
     */
    constructor() {
        this.userName = process.env.DB_USERNAME
        this.password = process.env.DB_PASSWORD
        this.dbName = process.env.DB_NAME
    }

    /**
     * Creates a connection to MongoDb service
     */
    static connection() {
        const db = new Database
        mongoose.connect(
            `mongodb+srv://${db.userName}:${db.password}@sopekocko.9y2ww.mongodb.net/${db.dbName}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
        )
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch(() => console.log('Connexion à MongoDB échouée !'));
    }
}