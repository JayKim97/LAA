const   express     =   require("express"),
        router      =   express.Router(),
        passport    =   require("passport"),
        Sponsor     =   require("../models/sponsor");

//show all sponsors
router.get("/", (req,res)=>{
    Sponsor.find({}, (err, allSponsor)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("sponsor/sponsor",{sponsors: allSponsor});
        }
    });
});

router.post("/",(req,res)=>{
    Sponsor.create(req.body.sponsor,(err,newSponsor)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("added new sponsor");
            console.log(newSponsor);
            res.redirect("/admin/sponsor");
        }
    });
});

//create new sponsor
router.get("/new",(req,res)=>{
    res.render("sponsor/new");
});

router.get("/:sponsor_id",(req,res)=>{
    res.send("get requrest");
});


//EDIT ROUTE
router.get("/:sponsor_id/edit",(req,res)=>{
    Sponsor.findById(req.params.sponsor_id,(err,foundSponsor)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("sponsor/edit",{sponsor: foundSponsor});
        }
    });
});

//UPDATE ROUTE
router.put("/:sponsor_id",(req,res)=>{
    Sponsor.findByIdAndUpdate(req.params.sponsor_id,req.body.sponsor,(err,updatedSlide)=>{
        if(err){
            res.redirect("/admin/sponsor");
        }
        else{
            res.redirect("/admin/sponsor");
        }
    });
});

//DESTROY ROUTE
router.delete("/:slide_id",(req,res)=>{
    Sponsor.findByIdAndRemove(req.params.slide_id,(err,slideRemove)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted");
            res.redirect("/admin/sponsor");
        }
    });
});

module.exports = router;