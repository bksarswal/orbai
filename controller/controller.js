  const schema= require("../schema/schema");
  const bcrypt= require('bcrypt');



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