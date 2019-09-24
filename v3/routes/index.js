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


//TODO require admin access
router.get("/about/edit", (req,res)=>{
    res.render("about/edit");
});




//middleware

function sortOrder(a,b){
    return a.order - b.order;
};

module.exports = router;
