const ex = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app =ex();
app.use(ex.static(__dirname));
app.use(ex.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/details')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connected successfully");
    
})

const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    streetnumber:String,
    postcode:String,
    city:String,
    country:String,
    language:String,
    email:String,
    date:String,
    month:String,
    year:String,
   
})

const Users = mongoose.model("info",userSchema);


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"form.html"))
})

app.post('/post',async (req,res)=>{
    const  {firstname,lastname,streetnumber,postcode,city,country,
        language,email,date,month,year}= req.body
    const user = new Users({
        firstname,
        lastname,
        streetnumber,
        postcode,
        city,
        country,
        language,
        email,
        date,
        month,
        year
        

    })
    await  user.save()
    console.log(user);
    res.sendFile(path.join(__dirname,"austrianmain.html"))
})


app.listen(5612,()=>{
    console.log("http://localhost:5612");
    
})