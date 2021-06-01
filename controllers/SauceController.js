import fs from 'fs'
import Sauce from '../models/Sauce.js'

/**
 * Sauce Controller
 */
class SauceController {
    /**
     * Get all sauces from database
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static getAll(req, res) {
        Sauce.find()
            .then(sauces => res.status(200).json(sauces))
            .catch(error => res.status(404).json({ error }))
    }

    /**
     * Get one sauce from database
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static getOne(req, res) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => res.status(200).json(sauce))
            .catch(error => res.status(404).json({ error }))
    }

    /**
     * Create a sauce object in the database
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static create(req, res) {
        const sauceObject = JSON.parse(req.body.sauce)
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        sauce.save()
            .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !' }))
            .catch(error => res.status(400).json({ error }))
    }

    /**
     * Update one sauce datas in the database
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static update(req, res) {
        if (req.file) {
            Sauce.findOne({ _id: req.params.id })
                .then(sauce => {
                    const filename = sauce.imageUrl.split('/images/')[1]
                    fs.unlink(`images/${filename}`, () => {})
                })
                .catch(error => console.log(error))
        }

        const sauceObject = req.file ?
            {
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body }

        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }))

    }

    /**
     * Delete one sauce object from the database
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static delete(req, res) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                        .catch(error => res.status(400).json({ error }))
                })
            })
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * Adds/Removes userId in "usersLiked"/"usersDisliked" to one sauce object in the database,
     * calculates the number of "likes" and "dislikes" and join the results to the object
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static like(req, res) {
        const userId = req.body.userId

        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const values = {
                    usersLiked: sauce.usersLiked,
                    usersDisliked: sauce.usersDisliked,
                    like: 0,
                    dislikes: 0
                }

                let message

                switch (parseInt(req.body.like)) {
                    case 1:
                        values.usersLiked = [...sauce.usersLiked, userId]
                        message = 'Vous aimez cette sauce !'
                        break
                    case 0:
                        values.usersLiked = sauce.usersLiked.filter(id => id !== userId)
                        values.usersDisliked = sauce.usersDisliked.filter(id => id !== userId)
                        message = 'Vous n\'avez pas d\'avis concernant cette sauce...'
                        break
                    case -1:
                        values.usersDisliked = [...sauce.usersDisliked, userId]
                        message = 'Vous n\'aimez pas cette sauce...'
                        break
                    default:
                        message = ''
                }

                values.likes = values.usersLiked.length
                values.dislikes = values.usersDisliked.length

                Sauce.updateOne({ _id: req.params.id }, values)
                    .then(() => res.status(200).json({ message }))
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(404).json({ error }))
    }
}

export default SauceController