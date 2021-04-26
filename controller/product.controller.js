let ProductModel = require("../model/product.model.js");

// Retrieve all product details 
let getProductDetails =(req,res)=> {

    ProductModel.find({},(err,result)=> {       // Calls model path
        if(!err){
            res.json(result);
        }
    })

};

let getProductById = (req,res)=> {
    
    let pid = req.params.pid;       // Passing id through path param 
    
    ProductModel.find({_id:pid},(err,data)=> {
        if(!err){
            res.json(data);
        }
    })
};

let storeProductDetails = (req,res)=> {
   
    let product = new ProductModel({        // Reference
         // Data comes from body 
        _id:req.body.pid,      
        pname:req.body.pname,
        price:req.body.price
    });

    product.save((err,result)=> {
        if(!err){
            res.send("Record stored successfully "+result);
        }else {
            res.send("Record didn't store "+err);
        }
    })
};

let deleteProductById = (req,res)=> {
    let pid = req.params.pid;                              // Delete based on path params
    ProductModel.deleteOne({_id:pid},(err,result)=> {     // deleteOne deletes one element, deleteMany deletes many.
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

let updateProductPrice = (req,res)=> {
    let pid = req.body.pid;                                                         // Update based on path params (Like delete method)
    let updatedPrice = req.body.price;
    ProductModel.updateMany({_id:pid},{$set:{price:updatedPrice}},(err,result)=> {  //Use $set for update method.
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


module.exports={getProductDetails,getProductById,storeProductDetails,deleteProductById,updateProductPrice}