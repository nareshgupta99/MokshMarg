const asyncErrorHandler = (func) => {
    return async function (req, res, next) {
        try {
            await func(req, res, next); // Ensure the async function is awaited
        } catch (err) {
            const {code}=err;
           if(code == 11000 ){
            res.status(401).json({
                message:"email is already registered"
            })
           }
           console.log(err);
           next(err)
        }
    };
};

module.exports=asyncErrorHandler