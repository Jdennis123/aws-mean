let express = require("express");   // Load express for routing
let router = express.Router();      // Router reference. 
let ProductController = require("../controller/product.controller.js");

// Mapping sub path with http methods. 
router.get("/allProductDetails",ProductController.getProductDetails);
router.get("/retrieveProductById/:pid",ProductController.getProductById)
router.post("/storeProductDetails",ProductController.storeProductDetails);      // Use post method for store
router.delete("/deleteProductById/:pid",ProductController.deleteProductById);   // Use delete for delete
router.put("/updateProductPrice",ProductController.updateProductPrice);         // Use put for update


module.exports = router;