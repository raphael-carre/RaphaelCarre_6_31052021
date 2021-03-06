/**
 * Validation class
 */
class Validator {
    /**
     * @property {String} defaultRegex Default RegExp to match
     * @property {Object} matches Object containing keys to match and relative RegExp and error messages
     * @property {Array} forbidden Array of objects containing RegExp to match forbidden strings and relative error messages
     */
    constructor() {
        this.defaultRegex = /^[\w\'"\.()\-!\?\s]+$/
        this.matches = {
            email: {
                filter: /^\w+([\-\.]?\w+)*@\w+([\-\.]?\w+)*\.[\w]+$/,
                message: 'Adresse e-mail non valide !'
            },
            password: {
                filter: [/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/, /^[^\\\/\$']+$/],
                message: [
                    'Le mot de passe doit comporter au minimum 8 caractères, dont au moins une lettre minuscule, une majuscule, un chiffre et un caractère spécial',
                    'Le mot de passe ne peut pas inclure les caractères \\, /, <, >, \' ou $'
                ]
            },
            name: { filter: this.defaultRegex, message: 'Le nom du produit n\'est pas valide' },
            manufacturer: { filter: this.defaultRegex, message: 'Le nom du fabricant n\'est pas valide' },
            mainPepper: { filter: this.defaultRegex, message: 'Le nom de l\'ingrédient n\'est pas valide' }
        }
        this.forbidden = [
            {
                // HTML tags
                filter: /<(!|\/)?[a-z\-]+(\s[a-z\-]+(=('|")?[\w:;\/\.\-\s]+('|")?)?)*\s?\/?>/gmi,
                message: 'Attention: les balises HTML sont interdites !'
            },
            {
                // SQL instructions
                filter: /[A-Z]+\s[\w\.\*]+(\s[A-Z]+\s[\w\.]+\s?)+(([A-Z]{5}\s[\w\.]+\s?=('|"|\s)?[\w\.]+('|"|\s)?)*((\s[A-Z]+)((\s[\w\.]+)?)*)?;?([A-Z\s]+[a-z]+)?\s?\n?)?$/gm,
                message: 'Attention: il est interdit d\'insérer des instructions SQL !'
            }
        ]
    }

    /**
     * Tests users' inputs with regular expressions
     * @param {Object} userInputs Object containing inputs to test
     * @returns {Error|Boolean} Returns an error if the test result is false, or returns true
     */
    test(userInputs) {
        for (let key in userInputs) {
            this.forbidden.map(regex => { if (regex.filter.test(userInputs[key])) throw new Error(regex.message) })

            if (this.matches[key]) {
                if (Array.isArray(this.matches[key].filter)) {
                    for (let i=0; i < this.matches[key].filter.length; ++i) {
                        if (!this.matches[key].filter[i].test(userInputs[key])) throw new Error(this.matches[key].message[i])
                    }
                } else {
                    if (!this.matches[key].filter.test(userInputs[key])) throw new Error(this.matches[key].message)
                }
            }
        }
        return true
    }

    /**
     * Removes forbidden strings or useless characters from the inputs
     * @param {Object} userInputs Object containing inputs to sanitize
     * @return {Object} Returns sanitized object
     */
    sanitize(inputs) {
        let sanitizedInputs = {}

        for (let key in inputs) {
                sanitizedInputs[key] = typeof inputs[key] === 'string' ? inputs[key].trim() : inputs[key]
        }
        return sanitizedInputs
    }
}

export default Validator