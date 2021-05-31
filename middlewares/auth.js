import Security from '../classes/Security.js'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userId = Security.decodeJwt(token)

        if (req.body.userId && req.body.userId !== userId) throw 'Identifiant utilisateur invalide !'
        else next()
    }
    catch (error) {
        res.status(401).json({ error: error || 'Requête non authentifiée !' })
    }
}