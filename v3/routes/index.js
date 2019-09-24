const   express     = require("express"),
        router      = express.Router(),
        passport    =require("passport"),
        Member      =require("../models/member"),
        Slide       =require("../models/slide");

router.get("/",(req,res)=>{
    Slide.find({},(err,allSlides)=>{
        if(err){
            console.log(err);
        }
        else{
            allSlides = allSlides.sort(sortOrder);
            res.render("landing",{slides:allSlides});
        }
    })
});
//events page
router.get("/events", (req,res)=>{
    res.render("events/events");
});


//main entry for about 
router.get("/about",(req,res)=>{
    Member.find({},(err,allMember)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("about/about",{ members:allMember});
        }
    });
});

//view all members
router.get("/about/members",(req,res)=>{
    Member.find({},(err,allMember)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("about/members",{ members:allMember});
        }
    });
});


router.post("/about/members",(req,res)=>{
    Member.create(req.body.member,(err,newMember)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("added new");
            res.redirect("/about/members");
        }
    });
});

//create new members
router.get("/about/members/new",(req,res)=>{
    res.render("about/members-new.ejs");
});

router.get("/:member_id",(req,res)=>{
    res.send("GET REQUESTED");
});

//Update route
router.put("/:member_id",(req,res)=>{
    Member.findByIdAndUpdate(req.params.member_id,req.body.slide,(err,updateMember)=>{
        if(err){
            console.log("update error")
            res.redirect("/about/members");
        }
        else{
            res.redirect("/about/members")
        }
    });
});

//TODO require admin access
router.get("/about/edit", (req,res)=>{
    res.render("about/edit");
});




//middleware

function sortOrder(a,b){
    return a.order - b.order;
};

module.exports = router;
