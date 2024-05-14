const errorHandler = (err, req, res, next) => {
    let msg = '';
    if(err){
        msg = `The method of ${req.method} cannot procced on the url: ${req.originalUrl}, Error: ${err.message} `;
        console.log(msg)
        return next(err)
    }
    next();
}
module.exports = errorHandler;