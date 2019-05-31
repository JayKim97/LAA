const   express     = require("express"),
        router      = express.Router(),
        passport    =require("passport"),
        Slide       =require("../models/slide");

//SHOW ALL SLIDES
router.get("/",(req,res)=>{
    Slide.find({},(err,allSlides)=>{
        if(err){
            console.log(err);
        }
        else{
            allSlides = allSlides.sort(sortOrder);
            res.render("slide/slide",{slides:allSlides});
        }
    });
});

router.post("/",(req,res)=>{
    Slide.create(req.body.slide,(err,newSlide)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("added new for somereason");
            console.log(newSlide);
            res.redirect("/slide");
        }
    });
});

//CREATE NEW SLIDE
router.get("/new",(req,res)=>{
    res.render("slide/new");
});

router.get("/:slide_id",(req,res)=>{
    res.send("GET REQUEST");
});

//EDIT ROUTE
router.get("/:slide_id/edit",(req,res)=>{
    Slide.findById(req.params.slide_id,(err,foundSlide)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(foundSlide);
            res.render("slide/edit",{slide: foundSlide});
        }
    });
});

//UPDATE ROUTE
router.put("/:slide_id",(req,res)=>{
    Slide.findByIdAndUpdate(req.params.slide_id,req.body.slide,(err,updatedSlide)=>{
        if(err){
            res.redirect("/slide");
        }
        else{
            res.redirect("/slide");
        }
    });
});


//DESTORY ROUTE
router.delete("/:slide_id", (req,res)=>{
    console.log("here");
    Slide.findByIdAndRemove(req.params.slide_id,(err,slideRemove)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/slide");
        }
    });
});



//middleware

function sortOrder(a,b){
    return a.order - b.order;
};


module.exports = router;