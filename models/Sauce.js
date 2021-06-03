/**
 * @module Models/Sauce
 */
import mongoose from 'mongoose'

/**
 * @type {Object}
 * @property {String} userId
 * @property {String} name
 * @property {String} manufacturer
 * @property {String} description
 * @property {String} mainPepper
 * @property {String} imageUrl
 * @property {Number} heat
 * @property {Number} likes
 * @property {Number} dislikes
 * @property {Array} usersLiked
 * @property {Array} usersDisliked
 */
const sauceSchema = mongoose.Schema({
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name:           { type: String, required: true },
    manufacturer:   { type: String, required: true },
    description:    { type: String, required: true },
    mainPepper:     { type: String, required: true },
    imageUrl:       { type: String, required: true },
    heat:           { type: Number, required: true, min: 1, max: 10 },
    likes:          { type: Number, default: 0 },
    dislikes:       { type: Number, default: 0 },
    usersLiked:     { type: [String] },
    usersDisliked:  { type: [String] }
})

export default mongoose.model('Sauce', sauceSchema)