let CourseModel = require("../model/course.model.js");
let app = require("express")();

// Retrieve all course details 
let getCourseDetails =(req,res)=> {

    CourseModel.find({},(err,result)=> {       // Calls model path
        if(!err){
            res.json(result);
        }
    })

};

let getCourseById = (req,res)=> {
    
    let cid = req.params.cid;       // Passing id through path param 
    
    CourseModel.find({_id:cid},(err,data)=> {
        if(!err){
            res.json(data);
        }
    })
};

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/add.html");
});

app.post("/add_course", (req,res)=>{
    var courses = new Courses(req.body);
    courses.save().then(c => {
        console.log("Record inserted successfully!"+ result);
        res.sendFile(__dirname + "/index.html")
    })
    .catch(err =>{
        res.send("Record did not insert" + err);
    })
})

let storeCourseDetails = (req,res)=> {
   
    let course = new CourseModel({        // Reference
        // Data comes from body 
        _id:req.body.cid,      
        cname:req.body.cname,
        cdesc:req.body.cdesc,
        amount:req.body.amount
    });

    course.save((err,result)=> {
        if(!err){
            console.log("Record stored successfully "+result);
            res.sendFile(__dirname + "/index.html")
        }else {
            res.send("Record didn't store "+err);
        }
    })
};

let deleteCourseById = (req,res)=> {
    let cid = req.params.cid;                              // Delete based on path params
    CourseModel.deleteOne({_id:cid},(err,result)=> {     // deleteOne deletes one element, deleteMany deletes many.
        if(!err){
                if(result.deletedCount>0){
                    res.send("Record deleted successfully!")
                }else {
                    res.send("Record not present!");
                }
        }else {
            res.send("Error generated "+err);
        }
    })
};

let updateCourseAmount = (req,res)=> {
    let cid = req.body.cid;                                                         // Update based on path params (Like delete method)
    let updateAmount = req.body.amount;
    CourseModel.updateMany({_id:cid},{$set:{amount:updateAmount}},(err,result)=> {  //Use $set for update method.
        if(!err){
            if(result.nModified>0){
                    res.send("Record updated succesfully!")
            }else {
                    res.send("Record is not available!");
            }
        }else {
            res.send("Error generated! "+err);
        }
    })
};




module.exports={getCourseDetails,getCourseById,storeCourseDetails,deleteCourseById,updateCourseAmount}