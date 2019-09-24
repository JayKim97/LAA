const   express     = require("express"),
        router      = express.Router(),
        passport    =require("passport"),
        Member      =require("../models/member");

//view all members
router.get("/",(req,res)=>{
    Member.find({},(err,allMember)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("members/members",{ members:allMember});
        }
    });
});

router.post("/",(req,res)=>{
    Member.create(req.body.member,(err,newMember)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("added new");
            res.redirect("/admin/members");
        }
    });
});

//create new members
router.get("/new",(req,res)=>{
    res.render("members/members-new.ejs");
});

router.get("/:member_id",(req,res)=>{
    res.send("GET REQUESTED");
});

//edit route
router.get("/:member_id/edit",(req,res)=>{
    Member.findById(req.params.member_id,(err,foundMember)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(foundMember);
            res.render("members/edit",{member: foundMember});
        }
    });
});

//Update route
router.put("/:member_id",(req,res)=>{
    Member.findByIdAndUpdate(req.params.member_id,req.body.member,(err,updateMember)=>{
        if(err){
            console.log("update error")
            res.redirect("/admin/members");
        }
        else{
            res.redirect("/admin/members")
        }
    });
});

//destroy route
router.delete("/:member_id",(req,res)=>{
    Member.findByIdAndRemove(req.params.member_id,(err,memberRemove)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/admin/members");
        }
    });
});

module.exports = router;