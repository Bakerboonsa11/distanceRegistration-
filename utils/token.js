// const signInToken=(uid)=>{
//     return jwt.sign({uid},process.env.JWTSECRETWORD,{expiresIn:process.env.JWTEXPIRETIME})
// }
const jwt=require("jsonwebtoken")
const createToken =(user ,res)=>{
    id=user._id
    const token =jwt.sign({id},process.env.JWTSECRETWORD,{expiresIn:process.env.JWTEXPIRETIME})

res.cookie('jwt', token, {
  httpOnly: true,
  sameSite: 'None', // Allow cross-site requests
  secure: process.env.NODE_ENV === 'production'?true:false,
  maxAge: 24 * 60 * 60 * 1000 // Cookie expiration (1 day)
});



  res.status(200).json({
    status: "success",
    token,
    user
  });


}

module.exports=createToken