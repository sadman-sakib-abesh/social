//***********bismillahirrahmanirrahim******************************   //

const express=require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
const urlExists = require('url-exists');
const nodemailer=require("nodemailer");
const passwordHash=require("password-hash")
const app=express();
const emailExistence=require("email-existence")
const otpGenerator = require('otp-generator')
const sessionStorage=require("./session")


app.use(cors());

app.use(bodyparser.json({limit: '2mb'}));
app.use(bodyparser.urlencoded({ extended: true }));


const mongo=require("mongodb");
const url="mongodb+srv://admin_Abesh:PlGWD1AsxDkSvF18@cluster0.fpqk3.mongodb.net?retryWrites=true&w=majority";


mongo.MongoClient.connect(url,{ useUnifiedTopology: true },(error,db)=>{
  
  if(error){
    console.log(error);
  }
  else{
    
const dbo=db.db("business");
  const user=dbo.collection("user");
  const post=dbo.collection("post");
  const trophy=dbo.collection("trophy");
  const comment=dbo.collection("comment");
  
    //workspace
    
    
    
  //registration to business point
  app.post("/sign",(req,res)=>{
    
user.countDocuments({email:req.body.email},(err,doc)=>{
  
if(doc>0){
    res.send({"err":"**user already exist with this email**"})
  }
  else{
  
  //mail******
  
emailExistence.check(req.body.email,(err,data)=>{
  
  
  if(data==false){
    res.send({"err":"**invalid email address"})
  }
  else{

var transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
    user:process.env.GMAIL_USER || "noreply.businesspoint@gmail.com",
    pass:process.env.USER_PASS || "20_21<point>"
  }
});
  
  
  
var mailOptions = {
  from:process.env.GMAIL_USER || "noreply.businesspoint@gmail.com",
  to:process.env.RECEIVE_USER || req.body.email,                
  subject:"Business Point Signup",
  html:`<h2>Congratulations ${req.body.name} !!!</h2><br/>Recently you signed up in business point using this email. Is this you? If not then reply to this email and we will delete the account.<br/><br/> CEO,Business Point<br/><br/><a href='#'>businesspoint.com</a>`
};

  
  
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.send({"err":"**it's our problem"})
    console.log(error)
  } else {
    //insert
  user.insertOne(req.body,(err,info)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send("successfully signed up")
    }
  })
    
     //insert
    }
  
  //mail*******
})
  }
})

}


})
 })
 //registration to business point*
    
    
    
    
    
//login to account ****
app.post("/login",(req,res)=>{
  user.findOne({email:req.body.email},(err,info)=>{
    if(info){
      if(passwordHash.verify(req.body.password,info.Hash)===true){
        res.send({"good":"logged in successfully","id":info._id,"name":info.name,"email":info.email})
      }
      else{
        res.send({"err":"**incorrect password or email**"})
      }
      
    }
    else{
      res.send({"err":"**user doesn't exist. Sign up first**"})
    }
    
  })
})
  //login to account  ****
  
  
  //otp match for renew password
  app.post("/otp",(req,res)=>{
    
    if(req.body.send==="true"){
emailExistence.check(req.body.email,(err,info)=>{
  if(info===false){
    res.send({"err":"invalid email address "})
  }
  else{
sessionStorage.setItem("otp",otpGenerator.generate(8, { lowerCase: false, specialChars: false }))
user.countDocuments({email:req.body.email},(err,data)=>{
  if(data===0){
    res.send({"err":"User doesn't exist"})
  }
  else if(data>0){


var transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user:process.env.GMAIL_USER || "noreply.businesspoint@gmail.com",
    pass:process.env.USER_PASS || "20_21<point>"
  }
});
  
  
  
var mailOptions = {
  from:process.env.GMAIL_USER || "noreply.businesspoint@gmail.com",
  to:process.env.RECEIVE_USER || req.body.email,                
  subject:"otp businesspoint",
  html:`<h1 style="backgroundColor:#c0c0c0;border:2px solid black;"> OTP-${sessionStorage.getItem("otp")}</h1><br /><br />
  Hello,
  we came to know that you forgot your password. Here is your otp.
  `
};

  
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    res.send("write the otp sent to your mail");
  }
  
      
    })
    
    }
})

}
})
    }
    else if(req.body.send==="false"){
      if(req.body.otp===sessionStorage.getItem("otp")){
      res.send("reset new password")
      
      }
      else{
        res.send({"err":"wrong otp"})
      }
    }
    else if(req.body.send="false2"){
      user.updateOne({email:req.body.email},{$set:{Hash:req.body.Hash}},(err,info)=>{
        if(err){
          console.log(err)
        }else{
          res.send("password changed")
        }
        
      })
      
      
    }
    

  })
 //otp*****
 
 
 
 
 //post*****************
 app.post("/post",(req,res)=>{
   
  post.insertOne(req.body,(err,info)=>{
    if(err){
      res.send({"err":"**you crossed the limit of letter**"})
    }else{
      res.send("posted")
      
    }
  })
   
   
   
   
   })
 //post******************
 
 
 //newsfeed*********
 
 app.get("/newsfeed",(req,res)=>{
   
   post.find({},{"date":1,_id:0}).sort({"date":-1}).toArray((err,data)=>{
   if(err){
     console.log("prob")
   }
   else{
     res.send(data)
   }
   })
 })
 //newsfeed*********
 
 
 //like****
 app.post("/like",(req,res)=>{
  post.findOne({_id:mongo.ObjectId(req.body.ema)},(err,data)=>{
   
if(JSON.stringify(data.like).includes(req.body.id)){
       post.updateOne({_id:mongo.ObjectId(req.body.ema)},{$pull:{like:{id:req.body.id,name:req.body.name}}},(err,info)=>{
         if(err){
         console.log(err)
         }else{
           res.send("your reaction from this post is removed")
         }
       })
       
       
     }
else{
post.updateOne({_id:mongo.ObjectId(req.body.ema)},{$push:{like:{id:req.body.id,name:req.body.name}}},(err,info)=>{
         if(err){
         console.log()
         }else{
           res.send("you loved this post")
           console.log(data.like)
         }
       })
       
       
     }
   
   
   
   
   
   
   })
  
   
 }) //like****
 
 
 
 
 
 //share post*****
 app.post("/share",(req,res)=>{
   post.findOne({_id:mongo.ObjectId(req.body.share._id)},(err,data)=>{
     if(err){
       console.log(err)
     }else{
       if(data.name===req.body.name){
         res.send("you can't share your own post!!")
       }else{
         
post.insertOne(req.body,(err,info)=>{
  
      res.send("post shared on your timeline")
      
    
  })
         
         
       }
       
       
       
       
     }
     
     
     
     
     
   })
   })
 
 //share post****

 
 //other's id post
app.get("/profile_o/:_id_",(req,res)=>{
   
   post.find({id:req.params["_id_"]},{"date":1,_id:0}).sort({"date":-1}).toArray((err,data)=>{
     if(err){
       console.log(err)
     }else{
       res.send(data)
     }
     
   })
 })
 //profile
app.get("/profile_u/:_id_",(req,res)=>{
   user.findOne({_id:mongo.ObjectId(req.params["_id_"])},(err,data)=>{
     if(err){
       console.log(err)
     }else{
res.send([{"name":data.name,"follower":data.follower,"following":data.following ,"bio":data.bio,"fb":data.fb,"li":data.li,"tw":data.tw}])
    
    
     }
     
   })
   
 })
 //profile
 
 
 //follow*****
 app.post("/follow",(req,res)=>{
user.findOne({_id:mongo.ObjectId(req.body._id_)},(err,data)=>{
   if(JSON.stringify(data.follower).includes(req.body.id)){
     
user.updateOne({_id:mongo.ObjectId(req.body._id_)},{$pull:{follower:{id:req.body.id,name:req.body.name}}},(err,info)=>{
         if(err){
         console.log(err)
         }else{
           
         }
       })
       
user.updateOne({_id:mongo.ObjectId(req.body.id)},{$pull:{following:{id:req.body._id_,name:req.body._name_}}},(err,info)=>{
         if(err){
         console.log(err)
         }else{
        
         }
       })
     
   }
    else{
     
user.updateOne({_id:mongo.ObjectId(req.body._id_)},{$push:{follower:{id:req.body.id,name:req.body.name}}},(err,info)=>{
         if(err){
         console.log(err)
         }else{
           
         }
       })
       
user.updateOne({_id:mongo.ObjectId(req.body.id)},{$push:{following:{id:req.body._id_,name:req.body._name_}}},(err,info)=>{
         if(err){
         console.log(err)
         }else{
          
         }
       })
     
   }
})
})
 
 
 //follow*****
 
//other's id post
 
  
  
  
  
  
    user.countDocuments({email:"sadmansakibabesh@gmail.com"},(err,info)=>{
    
    })
    
    post.findOne({mail:"sadmansakibabesh@gmail.com"},(err,info)=>{
    })

    
    //workspace

    
app.listen(process.env.PORT || 3002,(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("success");
  }
});


//
    






  }//else mong
})//main mongo closing




