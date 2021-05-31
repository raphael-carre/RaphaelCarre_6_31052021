import mongoose from 'mongoose'

const sauceSchema = mongoose.Schema({
    userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name:           { type: String, required: true },
    manufacturer:   { type: String, required: true },
    description:    { type: String },
    mainPepper:     { type: String },
    imageUrl:       { type: String },
    heat:           { type: Number },
    likes:          { type: Number },
    dislikes:       { type: Number },
    usersLiked:     { type: [String] },
    usersDisliked:  { type: [String] }
})

export default mongoose.model('Sauce', sauceSchema)