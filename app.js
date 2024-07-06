if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const { referrerSendMail, refreeSendMail } = require("./mail");
const mongoose = require("mongoose")
const app = express();
const port = 8080;
const { messageSend } = require("./firebase");
const connection = require("./model")
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


const insertSessionData = async (sessionData) => {
  const { referrerName, referrerEmail, refreeName, refreeEmail, course } =
    sessionData;

  try {
    const query = `
      INSERT INTO session_data (referrer_name, referrer_email, refree_name, refree_email, course)
      VALUES (?, ?, ?, ?, ?)
    `;
    await connection.query(query, [
      referrerName,
      referrerEmail,
      refreeName,
      refreeEmail,
      course,
    ]);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};


app.post("/getdata", async(req, res) => {
  let { data } = req.body;
  console.log(data)
  await referrerSendMail(
    data.referrerName,
    data.referrerEmail,
    data.refreeName,
    data.course
  );
  await refreeSendMail(
    data.refreeName,
    data.refreeEmail,
    data.referrerName,
    data.course
  );

  // insertSessionData(data);
 
  console.log("Credentials saved successfully !");

});
app.post("/getToken", async (req,res) => {
  let { token } = req.body;
  console.log(token);
    // messageSend(token)

})
console.log("all ok");
