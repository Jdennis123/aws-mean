let express = require("express");   // Load express for routing
let router = express.Router();      // Router reference. 
let CourseController = require("../controller/course.controller.js");

// Mapping sub path with http methods. 
router.get("/allCourseDetails",CourseController.getCourseDetails);
router.get("/retrieveCourseById/:cid",CourseController.getCourseById)
router.post("/storeCourseDetails",CourseController.storeCourseDetails);      // Use post method for store
router.delete("/deleteCourseById/:cid",CourseController.deleteCourseById);   // Use delete for delete
router.put("/updateCoursePrice",CourseController.updateCourseAmount);        // Use put for update

module.exports = router;