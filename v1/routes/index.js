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


//main entry for about 
router.get("/about",(req,res)=>{
    res.render("about/about");
});

//main entry for members
router.get("/about/members", (req,res)=>{
    Member.find({},(err,allMember)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("about/members",{ members:allMember});
        }
    });
});

router.get("/about/members/edit", (req,res)=>{
    res.render("about/edit");
});

//middleware

function sortOrder(a,b){
    return a.order - b.order;
};

module.exports = router;
