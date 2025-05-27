import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AccessToken } from "livekit-server-sdk";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const apiKey = "APIN3AV8SPJtT4e";
const apiSecret = "rnBiSSxyXXqociKTmFPDqUvegGQuef1LOfZL0fvD5ibB";
const livekitHost = "wss://smartportal-dvl5o7ji.livekit.cloud";

app.post("/get-token", async (req, res) => {
  const { roomName, userName } = req.body;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: userName,
  });

  token.addGrant({ roomJoin: true, room: roomName });
  res.send({ token: await token.toJwt(), url: livekitHost });
});

app.listen(5000, () => {
  console.log("Token server running on http://localhost:5000");
});
