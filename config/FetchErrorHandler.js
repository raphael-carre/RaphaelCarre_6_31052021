/**
 * FetchErrorHandler Class
 */
class FetchErrorHandler extends Error {
    /**
     * @param {Number} statusCode 
     * @param {String} errorMessage 
     */
    constructor(statusCode = 500, errorMessage = null) {
        super()

        if (Error.captureStackTrace) { Error.captureStackTrace(this, FetchErrorHandler)}

        this.statusCode = statusCode || 400
        this.message = errorMessage || this.message(statusCode)
    }

    /**
     * Returns an error message depending on statusCode parameter
     * @param {Number} statusCode 
     * @returns {String} Error message
     */
    message(statusCode) {
        let errorMessage

        switch (statusCode) {
            case 400:
                errorMessage = 'Requête invalide !'
                break
            case 401:
                errorMessage = 'Vous n\'avez pas l\'autorisation d\'effectuer cette action !'
                break
            case 403:
                errorMessage = 'Accès refusé !'
                break
            case 404:
                errorMessage = 'Ressource introuvable...'
                break
            default:
                errorMessage = 'Il y a eu un problème...'
        }

        return errorMessage
    }
}

export default FetchErrorHandler