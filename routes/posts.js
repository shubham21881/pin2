const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterest")

// Define the schema for the posts
const postSchema = new mongoose.Schema({
  imagetext: {
    type: String,
    required: true,
  },


  image:{
  type:String
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  like: {
    type: Array,
    default: [], // Default like count is 0
    
  }
}); // This automatically adds createdAt and updatedAt fields

// Create the model from the schema
module.exports = mongoose.model('Post', postSchema);

 
