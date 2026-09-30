const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const PORT = Number(process.env.PORT) || 9000;

// Simple health check for the hosting platform.
app.get("/", (_req, res) => {
  res.status(200).send("Forest PeerServer is running");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`PeerServer listening on ${PORT}`);
});

// PeerJS signaling endpoint: /peerjs
const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  proxied: true,
});

app.use("/peerjs", peerServer);

peerServer.on("connection", (client) => {
  console.log("Peer connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("Peer disconnected:", client.getId());
});
