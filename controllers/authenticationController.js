const catchAsync=require('../utils/catchAsync');
const appError= require('../utils/appError')
const jwt =require('jsonwebtoken');
const {promisify}=require('util')
const User = require('../models/userModel');
const createToken=require("../utils/token");


// exports.signUp =catchAsync(async(req,res,next)=>{
//     // take the info from the user 
//      console.log(req.body)

    
     
 
//     // create the elemnt in the data base 
//     const user = await User.create(req.body)

//     if (!user){
//      return new appError('the user is not created do to some issue',400)
//     }
//     //  create a token for the user and send it to response 

//    createToken(User,res)



// })

// exports.signUp = catchAsync(async (req, res, next) => {
//   // 1. Take the information from the user (logging to console for debugging)
//   console.log("data that came to backend is ",req.body);

//   // 2. Create the user in the database
//   const user = await User.create(req.body);

//   if (!user) {
//     // 3. If user creation fails, throw an error
//     return next(new appError('The user is not created due to some issue', 400));
//   }

//   // 4. Create a token for the user and send it in the response
//   createToken(user, res);  // Pass the actual user object instead of User model
// });
  exports.signIn=catchAsync(async(req,res,next)=>{
   const {email,uid}=req.body
   console.log(email,uid);
  if(!email||!uid) {
    return next(new appError("please provide the email or password",400))
  }
 const user=await User.findOne({email}).select("+uid")
  console.log(user)
 if(!user || !await user.correctPassword(uid,user.uid)){
     return next(new appError("incorrct password or email",400))
 }
  // console.log(user, "is UserActivation")

 createToken(user,res)

})



exports.protect= catchAsync(async(req,res,next)=>{
    console.log('entered the protect one ')
   let token;
   // check if the header exist and start with bearer
   console.log(req.header.authorization)
  //  console.log('protect is wrunnung')
  //  console.log(req.headers.cookie)
  //  console.log(req.cookies.jwt)
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1];
  // console.log("cookie is from header")
    console.log('the token from the header is ',req.headers.authorization)
       console.log('the token from the header is ',req.headers.authorization)
   

}
else if(req.cookies.jwt){
  // console.log("jwt is from cookie")
   token=req.cookies.jwt
    console.log('the token from the cookie is ',req.cookies.jwt)
}

console.log('the token is ',token)

if (!token || token === 'null') {

  return next(new appError('You are not logged in! Please log in to get access.', 401));
}
 
    // console.log("the token is ",token)
   // verify the token 
   const decoded= await promisify(jwt.verify)(token,process.env.JWTSECRETWORD)
  //  console.log(decoded)
   // check weather a user is still exist 
   const freshUser= await User.findById(decoded.id)
  //  console.log("the fresh user is ",freshUser)
   if(!freshUser){
      return next(new appError("the user blonging to this token does not exist"),401)
   }
  //  console.log(decoded.iat)
   if(freshUser.ispasswordUpdated(decoded.iat)){
       return next(new appError("user changed a password pleaselogin again"),401)
    };

    req.user=freshUser
   
   next()
});


exports.strictTo = (...roles) => {
    // console.log('Entered restrict middleware');
    return (req, res, next) => {
        // console.log('User in strictTo:', req.user);
        if (!req.user || !roles.includes(req.user.roles)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};


