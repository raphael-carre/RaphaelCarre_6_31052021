import Security from '../config/Security.js'
import User from '../models/User.js'

/**
 * User Controller
 */
class UserController {
    /**
     * User signup
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async signup(req, res) {
        const email = Security.encrypt(req.body.email)

        await Security.hash(req.body.password)
            .then(async hash => {
                const user = new User({ email, password: hash })

                await user.save()
                    .then(() => res.status(201).json({ message: 'Compte utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }

    /**
     * User login
     * @param {Request} req Request
     * @param {Response} res Response
     */
    static async login(req, res) {
        const email = Security.encrypt(req.body.email)

        await User.findOne({ email })
            .then(async user => {
                if (!user) return res.status(401).json({ error: 'Utilisateur inconnu !' })

                const userId = user._id

                await Security.compareHash(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' })

                        res.status(200).json({ userId, token: Security.createJwt(userId) })
                    })
                    .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    }
}

export default UserController