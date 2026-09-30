const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();

app.get("/", (req, res) => {
  res.send("Forest PeerServer is running");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

const peerServer = ExpressPeerServer(server, {
  path: "/",
  proxied: true
});

app.use("/peerjs", peerServer);
