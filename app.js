// Load all required modules 
let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
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
var Product = require("./router/product.router.js");

//URL 
//Middleware 

// http://localhost:9090/product/allProductDetails         Get App Product Details (Retrieve, delete, store, update, etc..) MAIN PATH
// http://localhost:9090/product/retrieveProductById/102   Get App Product Details by Id  
// http://localhost:9090/product/storeProductDetails       Rest client or post man {"pid":103,"pname":"Computer","price":43000} (Cannot run in browser)
// http://localhost:9090/product/deleteProductById/101     Delete using pid
// http://localhost:9090/product/updateProductPrice        Update price using pid {"pid":103,"price":48000}

app.use("/product",Product)     // Matches path
//app.use("/order",Order)
//app.use("/customer",Customer)



app.listen(9090,()=>console.log("Server running on port number 9090"));