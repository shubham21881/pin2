var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')
const passport= require('passport');
const localstrategy = require('passport-local');
const upload =require('./multer');
 passport.use(new localstrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
// router.get('/createuser', async function(req,res,next){
//   let createduser=await userModel.create({
//     username:"shubham",
//     password: "shubham",
//     posts: [],
    
//     email:"shubham@gmail.com",
//     fullName: "shubham mourya"
//   });
//   res.send(createduser)
// })
// router.get('/createpost',async function(req,res,next){
//       let createdpost=await postModel.create({
//     postText:'hello  kaise ho saare',
//     user:'65f6d7dca5a8d42a5d91df6b'
//   })
//   let user = await userModel.findOne({_id:"65f6d7dca5a8d42a5d91df6b"})
//   user.posts.push(createdpost._id);
//   await user.save();

//   res.send('done');
// })

// router.get('/alluserposts',async function(req,res,next){
//   let user =await userModel
//   .findOne({_id:'65f6d7dca5a8d42a5d91df6b'})
//   .populate('posts')
//   res.send(user);
// });
  router.post('/upload',  isLoggedIn, upload.single('file'), async function(req,res) {
    if(!req.file){
      return res.status(404).send('No files were uploaded.');
    }
      const user =await userModel.findOne({username: req.session.passport.user})
      const post = await postModel.create({
        image:req.file.filename,
        imagetext:req.body.filecaption,
        user:user._id
       })
        user.posts.push(post._id);
        await user.save();
        res.redirect('/profile')
        

  })



router.get('/feed',function(req,res,next){
  res.render('feed')         
})
router.get('/login',function(req,res,next){
  res.render('login',{error:req.flash('error')})
  
})
router.get('/profile', isLoggedIn, async function(req,res){
  const user =await userModel.findOne({
    username:req.session.passport.user
  })
  .populate('posts')
  console.log(user)
  res.render('profile' ,{user})
})
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash:true
 }),function(req,res){});

 
router.post('/register',function(req,res){
  var userdata= new userModel({ 
   username:req.body.username,
   email:req.body.email,
   fullname:req.body.fullname
   
  })
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
     })
   })
 });
  function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
     return next();
   }
   res.redirect('/')
  }
  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }); 
  
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/login')
   }
 
module.exports = router;
   
            