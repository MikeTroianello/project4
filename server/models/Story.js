const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: String,
  content: String,
  creatorId: String,
  idOfLastPage: String,
  teaser: String
  startingPage: {
    type:Boolean, 
    default:false
  },
  pageNumber: Number
})

const Story = mongoose.model("Page", storySchema);
module.exports = Story;