const mongo=require("mongodb").MongoClient;
const url="mongodb+srv://admin_Abesh:PlGWD1AsxDkSvF18@cluster0.fpqk3.mongodb.net/test?retryWrites=true&w=majority"






mongo.connect(url,{ useUnifiedTopology: true },(error,db)=>{
  
  if(error){
    console.log(error);
  }
  else{
console.log("connected");
var dbo=db.db("business")

dbo.collection("trophy").deleteMany({},(err,not)=>{
  if(err){
    console.log(err);
  }
  else{
    console.log("deleted");
  }
  
});

  }
});
