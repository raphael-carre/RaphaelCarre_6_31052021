import bcrypt from 'bcrypt'
import cryptoJs from 'crypto-js'
import jwt from 'jsonwebtoken'

/**
 * Security class
 */
class Security {
    /**
     * Creates a hash with BCrypt
     * @param {String} string String to hash
     * @returns {Promise} Hash or error
     */
    static hash(string) {
        return bcrypt.hash(string, 10)
    }

    /**
     * Compares two strings matching their BCrypt hash
     * @param {String} string String to encrypt
     * @param {String} stringToMatch Hash to match
     * @returns {Promise} Comparison result or error
     */
    static compareHash(string, stringToMatch) {
        return bcrypt.compare(string, stringToMatch)
    }

    /**
     * Encrypts a string with AES algorythm
     * @param {String} string String to encrypt
     * @returns {String} Encrypted string
     */
    static encrypt(string) {
        const { key, iv } = Security.generateAesKeys()
        return cryptoJs.AES.encrypt(string, key, { iv }).toString()
    }

    /**
     * Decrypts a string from AES algorythm
     * @param {String} string String to decrypt
     * @returns {String} Decrypted string
     */
    static decrypt(string) {
        const { key, iv } = Security.generateAesKeys()
        return cryptoJs.AES.decrypt(string, key, { iv }).toString(cryptoJs.enc.Utf8)
    }

    /**
     * Returns { key, iv } for AES encryption
     * @returns {{String, String}} { key, iv }
     */
    static generateAesKeys() {
        const key = cryptoJs.enc.Hex.parse(process.env.AES_KEY)
        const iv = cryptoJs.enc.Hex.parse(process.env.AES_IV)
        return { key, iv }
    }
    
    /**
     * Creates a JSON web token
     * @param {String} userId User Id
     * @returns {String} JWT
     */
    static createJwt(userId) {
        return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '24h' })
    }

    /**
     * Verifies the JSON web token
     * @param {String} token JWT
     * @returns {String} UserId
     */
    static decodeJwt(token) {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken.userId
    }
}

export default Security