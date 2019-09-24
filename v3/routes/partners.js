const   express     =   require("express"),
        router      =   express.Router(),
        passport    =   require("passport"),
        Sponsor     =   require("../models/sponsor");
//partners page 
//get partners
router.get("/", (req,res)=>{
    res.render("sponsor/partners");
});


module.exports = router;