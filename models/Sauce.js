import mongoose from 'mongoose'

const sauceSchema = mongoose.Schema({
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name:           { type: String, required: true },
    manufacturer:   { type: String, required: true },
    description:    { type: String, required: true },
    mainPepper:     { type: String, required: true },
    imageUrl:       { type: String, required: true },
    heat:           { type: Number, required: true },
    likes:          { type: Number, default: 0 },
    dislikes:       { type: Number, default: 0 },
    usersLiked:     { type: [String] },
    usersDisliked:  { type: [String] }
})

export default mongoose.model('Sauce', sauceSchema)