require("dotenv").config();
const admin=require("firebase-admin")
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const firebaseConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
const app = initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  
});
const messageSend = (token) => {
    const data = Date.now();
    const message = {
        
    data: {
        score: "850",
        time: "2:45pm",
            time1: "time1",
        
    },
    token: token,
};
getMessaging()
  .send(message)
  .then((res) => {
      console.log(res);
      console.log("notification send")
  })
  .catch((e) => {
      console.log(e.message)
  });

}
module.exports={messageSend}

