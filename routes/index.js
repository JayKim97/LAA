const   express     = require("express"),
        router      = express.Router(),
        passport    =require("passport"),
        Member      =require("../models/member");

router.get("/",(req,res)=>{
    res.render("landing");
});

router.get("/about",(req,res)=>{
    Member.find({},(err,allMember)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("about",{ members:allMember});
        }
    });
});
module.exports = router;