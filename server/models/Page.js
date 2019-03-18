const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  title: String,
  content: String,
  creatorId: String,
  idOfLastPage: String,
  teaser: String
})

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;