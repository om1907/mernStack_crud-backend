const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||3300;


//mongodb connection
mongoose.connect('mongodb://localhost:27017/mernStack_crud').then(()=>{
    console.log('MongoDB is Connected Successfully');
}).catch((err)=>{
    console.log(err);
})

//new Schema 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//mongodb collection for above schema 
const User=mongoose.model('User',userSchema);

//create user 
app.post('/api/createuser',async(req,res)=>{
    try {
        const bodyData=req.body;
        const user=new User(bodyData);
        const userData=await user.save();
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
})

//getAllUserData

app.get('/api/getalluserdata',async(req,res)=>{
   try {
        const userData=await User.find({});
        res.send(userData);
   } catch (error) {
        res.send(error);
   }
})


//get single user data
app.get('/api/getuserData/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await User.findById({_id:id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})

//update user data

app.put('/api/updateuser/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await User.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})

//delete user 

app.delete('/api/deleteuser/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const user=await User.findByIdAndDelete({_id:id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
})

app.get('/',(req,res)=>{
    res.send('Hello !,This is a mernStack CRUD App.')
})


app.listen(PORT,()=>{
    console.log(`Server is running : http://localhost:${PORT}`);
})