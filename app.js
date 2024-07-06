if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { referrerSendMail, refreeSendMail } = require("./mail");
const SessionData = require("./model");
const mongoose = require("mongoose")
const app = express();
const port = 8080;
const { messageSend } = require("./firebase");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Other headers you may need to include
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.listen(port, (req, res) => {
  console.log("listening to 8080");
});



async function main() {
  await mongoose.connect(process.env.MONGOURL, { serverSelectionTimeoutMS: 30000 });
}
main()
  .then((res) => {
    console.log("Connection Sucessfull !");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/getdata", async(req, res) => {
  let { data } = req.body;
  await  referrerSendMail(data.referrerName, data.referrerEmail,data.refreeName,data.course);
    await refreeSendMail(data.refreeName, data.refreeEmail, data.referrerName,data.course);
    const session = new SessionData(data);
  await session.save();
    console.log("Credentials saved successfully !")
});
app.post("/getToken", async (req,res) => {
  let { token } = req.body;
  console.log(token);
    // messageSend(token)

})
console.log("all ok");
