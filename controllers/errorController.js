const errorController=(error,req,res,next)=>{
    console.log("entered the error controller")
    console.log(error);
    res.send("the error is handeled")
}
module.exports=errorController