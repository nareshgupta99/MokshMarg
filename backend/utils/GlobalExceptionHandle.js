const asyncErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (err) {
            console.error("Error caught by asyncErrorHandler:", err); // Log the error
            if (!res || !res.status) {
                return next(err); // Pass to global error handler if `res` is undefined
            }
            console.log(err)
            statusCode=err.Code || 500
            res.status(statusCode).json({ message: err.message});
        }
    };
};
module.exports=asyncErrorHandler