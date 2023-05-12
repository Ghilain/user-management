module.exports = async (re, res, next) => {
    try {
        
        const jwtToken = req.header("token");
        
        if(!jwtToken){
            return re.status(403).json("Not Authorize");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorizedd");        
    }
}