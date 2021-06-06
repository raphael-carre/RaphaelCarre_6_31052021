/**
 * @module Models/User
 */
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

/**
 * @type {Object}
 * @property {String} email User email
 * @property {String} password User password
 */
const userSchema = mongoose.Schema({
    email:      { type: String, required: [true, 'Vous devez indiquer une adresse e-mail'], unique: true },
    password:   { type: String, required: [true, 'Vous devez indiquer un mot de passe'] }
})

userSchema.plugin(uniqueValidator, { message: 'Cet e-mail a déjà été enregistré !' })

export default mongoose.model('User', userSchema)