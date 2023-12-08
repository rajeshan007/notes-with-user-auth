 const jwt = require("jsonwebtoken")
   const authenticateUser =  (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        const tokenData  = jwt.verify(token, process.env.JWT_SECRET)
        req.userId =  tokenData.id
        next()
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = authenticateUser


// tokenData is a object
// { id: '654bddbcca42e5fe291cb0c4', iat: 1699798448, exp: 1700403248 }
 
// note :- jwt.verify() method returns an object  {}