export default (req, res, next) => {
    console.info('Request :', { method: req.method, route: req.url })

    const requestLogs = {
        query: req.query,
        body: req.body,
    }

    console.debug(requestLogs)
    next()
}