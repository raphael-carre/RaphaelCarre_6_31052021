import mongoose from 'mongoose'
import logger from './Winston.js'

/**
 * Database class
 */
class Database {
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
            .then(() => logger.info('Connection to MongoDB succeded !'))
            .catch(() => console.error('Connection to MongoDB failed !'));
    }
}

export default Database