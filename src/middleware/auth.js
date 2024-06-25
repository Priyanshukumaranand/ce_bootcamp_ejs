exports.auth=async (req,res,next)=>{
    try{
        // extract token
        const token= req.cookies.token ||
        req.body.token || req.header("Authorisation").replace("Bearer ","");

        // if token is missing 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        // verify the token 
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            });
        }
        next();
    }catch(error){
         return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
         })
    }
}