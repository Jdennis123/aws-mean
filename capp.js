// Load all required modules 
let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let mongoClient = require('mongodb').MongoClient;
let cors = require("cors");

// Database URL Details 
let url = "mongodb://localhost:27017/meanstack";

// Middleware enable data from post method(Between angular and server).
app.use(bodyParser.urlencoded({extended:true}));    // enable body part data (json or non) 
app.use(bodyParser.json());                         // enable json data. 
app.use(cors());                                    // enable cors policy 

// Database connection without warning 
const mongooseDbOption = {       // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,mongooseDbOption);   // ready to connect 

// Connect the data 
mongoose.connection

// link to router module like a import concept. 
var Course = require("./router/course.router.js");

//URL 
//Middleware 

// http://localhost:9090/course/addCourse
// http://localhost:9090/deleteCourse
// http://localhost:9090/updateCourse
// http://localhost:9090/fetchCourse

app.use("/course",Course)     // Matches path
//app.use("/order",Order)
//app.use("/customer",Customer)
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/addCourse",(req,res)=>{
    res.sendFile(__dirname + "/add.html");
});

app.get("/updateCourse",(req,res)=>{
    res.sendFile(__dirname + "/update.html");
});

app.get("/deleteCourse",(req,res)=>{
    res.sendFile(__dirname + "/delete.html");
});

app.get("/fetchCourse",(req,res)=>{
    res.sendFile(__dirname + "/fetch.html");
});

app.post("/addCourse", (req, res)=>{
    let cid = req.body.cid;
    let cname = req.body.cname;
    let cdesc = req.body.cdesc;
    let amount = req.body.amount;
    let courseDetails = {courseId:cid, courseName: cname, description: cdesc, amount: amount};
    mongoClient.connect(url,{useUnifiedTopology: true}, (err1,client)=>{
        if(!err1){
            let db = client.db("meanstack")
            db.collection("CourseInfo").insertOne(courseDetails,(err2,result)=>{
                if(!err2){
                    if(result.insertedCount>0){
                        res.send("Record inserted successfully")
                    }else{
                        res.send("Record did not inserted!")
                    }
                }
                client.close();
            })
        }
    })

})

app.post("/updateCourse", (req,res)=>{
    let cid = req.body.cid;
    let amount = req.body.amount;
    mongoClient.connect(url,{useUnifiedTopology: true},(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack")
            db.collection("CourseInfo").updateOne({courseId:cid}, {$set:{amount:amount}},(err2,result)=>{
                if(!err2){
                    if(result.modifiedCount>0){
                        res.send("Record updated successfully");
                    }else{
                        res.send("Record did not update!");
                    }
                }
                client.close();
            })
        }
    })
})

app.post("/deleteCourse", (req,res)=>{
    let cid = req.body.cid;
    mongoClient.connect(url,{useUnifiedTopology: true},(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CourseInfo").deleteOne({courseId:cid}, (err2,result)=>{
                if(!err2){
                if(result.deleteCount>0){
                    res.send("Record deleted successfully")
                    }
                }else{
                        res.send("Record not present!")
                }
            }
            )
        }            client.close();

    })
})

app.post("/fetchCourse", (req,res)=>{
    let cid = req.body.id;
    mongoClient.connect(url,{useUnifiedTopology: true},(err1,client)=> {
        if(err1){
            let db = client.db("meanstack");
            let cursor = db.collection("CourseInfo").find({"amount":{lt:60000}});
            cursor.each((err2,doc)=>{
                if(doc!=null){
                    res.send("Id is " + doc._id + "Course name is " + cname + "Description is "+ cdesc + "Amount is "+ doc.amount)
                }
            })
                }
            })
        }
    )


module.exports={}
app.listen(9090,()=>console.log("Server running on port number 9090"));