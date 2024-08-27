const mongoose = require('mongoose');
const plm=require('passport-local-mongoose');


mongoose.connect("mongodb+srv://krishanmouryash:xblqgxFz9VjUFFtR@pin.qfkns.mongodb.net/pinterest")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    
    unique: true,
  },
  password: {
    type: String,
    
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }],   
  dp: {
    type: String,
   
  },
  email: {
    type: String,
  
    unique: true,
  },
  fullname: {
    type: String,
    
  }
});  

// If you haven't defined the Post model yet, you should define it similarly
// For example:
// const postSchema = new mongoose.Schema({
//   // post schema definition
// });
// mongoose.model('Post', postSchema);

// Create the model from the schema
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);



