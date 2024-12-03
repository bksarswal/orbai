  const schema= require("../schema/schema");
  const bcrypt= require('bcrypt');
  const jwt = require("jsonwebtoken");

const privateKey= "privateKey";

  exports.ragistation=(req,res)=>{

const {name,email,phone,password}= req.body;



if(!password){

    res.send('password is required ')
}
else{


bcrypt.genSalt(10,function(err,salt){
    if(err){
res.status(500).send({status:500, message:"err in gansoult " })
    }
else{

    
    bcrypt.hash(password, salt,function(err,hash){

        if(err){


            res.status(500).send({status:500,message:"ERR in hasing password"})
        }
        else{

       
            schema.insertMany({name:name,email:email,phone : phone ,password:hash}).then((result)=>{
               



                res.status(201).send({status:201,message:"user created successfully"})
            }).catch((err)=>{


                
          
console.log(err.message);


             if(err.name =='ValidationError'){

                res.status(500).send({  status:500,message:` ${err.message.split(':')[1]} is require`})


             }else if(err.name =='MongoBulkWriteError'){

       let value= err.message;
       let split =value.split(':')

                res.status(500).send( {status:500,message:`   ${split[3].replace('{',"")} : ${ split[4].replace("}","")}is   allready exist `});
             }
             else{

                res.send("some thing went wrong");
             }
            
            })

        }
    })
}

})
}

}


exports.login=(req,res)=>{


        
    const {email,password}=req.body;

    if(!email || !password){

        res.status(400).send({status:400,message:"email and password is required"});
    }
    else{




schema.find({email:email}).then((result)=>{


    bcrypt.compare(password,result[0].password,function(err,auth){

        if(err){

            res.status(404).send({status:404,message:"user not found"});
        }
        else
        {

        if(auth==true){


const {id,name ,email,phone}=result[0];
res.status(200).send({status:200,message:"user login successfully",data:{_id:id ,name:name,email:email,phone:phone}})


        }
        else{


            res.status(500).send({status:500,message:"user not found"})
        }


        }
    })
}).catch((err)=>{

            res.status(500).send({status:500,message:"password incorrect"})

})
    }



}


exports.updatePhone= (req,res)=>{

    const {id,phone}=req.body;

    schema.updateOne({_id:id},{ $set:{phone:phone}}).then((result)=>{

              console.log(result);

        if(result.matchedCount==1){

res.send({message:"update successfully "})
        }
        else{


res.send({message:" not update "})
        }
    }).catch((err)=>{
res.status(400).send({status:400,message:"user note update "})

    })
}





exports.resetPassword = (req, res) => {
  const { id, old_pass, new_pass, confirm_pass } = req.body;

  // Validate input
  if (!id || !old_pass || !new_pass || !confirm_pass) {
    return res.status(400).send({ status: 400, message: "All fields are required" });
  }

  if (new_pass !== confirm_pass) {
    return res.status(401).send({ status: 401, message: "Passwords do not match" });
  }else{

     // Step 1: Find user by ID
  schema.findOne({ _id: id }).then((user) => {
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }

    // Step 2: Compare old password
    bcrypt.compare(old_pass, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ status: 401, message: "Old password is incorrect" });
        }

        // Step 3: Generate salt and hash new password
        bcrypt.genSalt(10    ,function(err,salt){

if(err){

  res.status(500).send({status:500,message:"something wbnt wromg"})
}
else{


  bcrypt.hash(new_pass,salt,function(err,hash){


      if(err){

res.status(500).send({status:500,message:"something wbnt wromg"})
      }
      else
      {

schema.updateOne({_id:id},{$set:{password:hash}}).then((result)=>{

if(result.matchedCount==1){
    res.status(200).send({status:200,message:"passupdate successfully"})
}else{

    res.send("password not update try again");
}

 
}).catch((err)=>{

  res.status(500).send({status:500,message:"something wbnt wromg"})
})

      }
  }
)
}

        }) 
        
   
      
      })
      .catch((err) => {
        console.error("Error comparing passwords:", err);
        res.status(500).send({ status: 500, message: "Server error" });
      });
  })
  .catch((err) => {
    console.error("Error finding user:", err);
    res.status(500).send({ status: 500, message: "Something went wrong" });
  });
  }

 
};


exports.deletuser= (req,res)=>{

    const {id}=req.body;

    schema.deleteOne({_id:id}).then((result)=>{

        console.log(result)

       if(result.deletedCount==1){
        res.status(201).send({status:201,message:"user delt successfully"});
       }
       else{

        res.status(500).send({status:500,message:"something went wrong"});
       }

    }).catch((err)=>{

        res.status(500).send({status:500,message:"something went wrong"});
    })
}


exports.ganTockenWithLogin=(req,res)=>{


        
    const {email,password}=req.body;

    var token = jwt.sign({email:email},privateKey,{expiresIn:'222s'});

    if(!email || !password){

        res.status(400).send({status:400,message:"email and password is required"});
    }
    else{




schema.find({email:email}).then((result)=>{


    bcrypt.compare(password,result[0].password,function(err,auth){

        if(err){

            res.status(404).send({status:404,message:"user not found"});
        }
        else
        {

        if(auth==true){


const {id,name ,email,phone}=result[0];

schema.updateOne({_id:id},{$set:{token:token}}).then((result)=>{


    
    if(result.matchedCount==1){
        res.status(200).send({status:200,message:"user login successfully",data:{_id:id ,name:name,email:email,phone:phone,token:token}})

    }
    else{
        res.send("user not login ");


    }
}).catch((err)=>{
    res.status(500).send({status:500,message:"user not found"})
})




        }
        else{


            res.status(500).send({status:500,message:"user not found"})
        }


        }
    })
}).catch((err)=>{

            res.status(500).send({status:500,message:"password incorrect"})

})
    }



}
