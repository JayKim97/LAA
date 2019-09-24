const   express         = require("express"),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        flash           = require("connect-flash"),
        methodOverride  = require("method-override"),
        User            = require("./models/user");

//REQUIRE ROUTES
const   indexRoutes = require("./routes/index"),
        slideRoutes = require("./routes/slide"),
        sponsorRoutes = require("./routes/sponsor"),
        partnerRoutes = require("./routes/partners");


//ROUTE REQUIREMENTS
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/laa",{ useNewUrlParser: true});

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "LaurierAccountingAssociation",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect-flash setup
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

app.use(indexRoutes);
app.use("/admin/slide",slideRoutes);
app.use("/admin/sponsor",sponsorRoutes);
app.use("/partners", partnerRoutes);


 app.listen(3000,()=>{
     console.log("LAA SERVER RUNNING...");
 });
