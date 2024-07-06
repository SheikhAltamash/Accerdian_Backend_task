const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const sessionData = new Schema({
  referrerName: String,
  referrerEmail: String,
  refreeName: String,
  refreeEmail: String,
  course:String,
});
const SessionData = mongoose.model("SessionData", sessionData);
module.exports = SessionData;