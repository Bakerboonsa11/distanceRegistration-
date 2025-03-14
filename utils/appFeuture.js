class AppFeatures{

    constructor(databaseQuery,queryString){
            this.databaseQuery=databaseQuery
            this.queryString=queryString
    }

   filter(){
    const queryObject={...this.queryString};
    const ExcludeObject=["page","limit","sort","fields"]

    ExcludeObject.forEach((el)=>{
        delete queryObject[el]
    })
    let queryString=JSON.stringify(queryObject)
    queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    this.databaseQuery.find(JSON.parse(queryString))
    return this
   }

  sort(){
    if(!this.queryString.sort){

     this.databaseQuery.sort("-createdAt")
    }
    else{
    const sortBy=this.queryString.sort.split(',').join(' ')
    this.databaseQuery.sort(`-${sortBy}`)
    }
    
     return this

  }

 fields(){

   if(this.queryString.fields){
    const selectBy=this.queryString.fields.split(',').join(' ');
   
    this.databaseQuery=this.databaseQuery.select(selectBy)
  
   }
   else{ this.databaseQuery=this.databaseQuery.select('-__v')}
   return this
  }

 pagination(){
    const limit=this.queryString.limit*1
    const page=this.queryString.page*1
    const skip=(page-1)*limit
    if(this.queryString.limit||this.queryString.page){
         this.databaseQuery.skip(skip).limit(limit)
    }

    return this
 }
}


module.exports=AppFeatures