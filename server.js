const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.get("/", (_req, res) => res.sendFile(__dirname + "/public/index.html"));
app.get("/overlay", (_req, res) => res.sendFile(__dirname + "/public/overlay.html"));
app.get("/overlay.html", (_req, res) => res.sendFile(__dirname + "/public/overlay.html"));

const state = {
  homeName: "Gazde",
  awayName: "Oaspeți",
  homeColor: "#1769aa",
  awayColor: "#b3261e",
  homeScore: 0,
  awayScore: 0,
  elapsedMs: 0,
  running: false,
  startedAt: null
};

function elapsedNow() {
  return Math.max(0, state.elapsedMs + (state.running && state.startedAt ? Date.now() - state.startedAt : 0));
}
function snapshot() {
  return {
    homeName: state.homeName, awayName: state.awayName,
    homeColor: state.homeColor, awayColor: state.awayColor,
    homeScore: state.homeScore, awayScore: state.awayScore,
    elapsedMs: elapsedNow(), running: state.running
  };
}
function sendState() { io.emit("state", snapshot()); }

io.on("connection", socket => {
  socket.emit("state", snapshot());
  socket.on("command", (msg = {}) => {
    switch (msg.type) {
      case "team":
        if (msg.team === "home") {
          if (typeof msg.name === "string") state.homeName = msg.name.slice(0, 32);
          if (typeof msg.color === "string" && /^#[0-9a-fA-F]{6}$/.test(msg.color)) state.homeColor = msg.color;
        } else if (msg.team === "away") {
          if (typeof msg.name === "string") state.awayName = msg.name.slice(0, 32);
          if (typeof msg.color === "string" && /^#[0-9a-fA-F]{6}$/.test(msg.color)) state.awayColor = msg.color;
        }
        break;
      case "score":
        if (msg.team === "home") state.homeScore = Math.max(0, state.homeScore + Number(msg.delta || 0));
        if (msg.team === "away") state.awayScore = Math.max(0, state.awayScore + Number(msg.delta || 0));
        break;
      case "timer":
        if (msg.action === "start" && !state.running) {
          state.startedAt = Date.now();
          state.running = true;
        } else if (msg.action === "stop" && state.running) {
          state.elapsedMs = elapsedNow();
          state.startedAt = null;
          state.running = false;
        } else if (msg.action === "reset") {
          state.elapsedMs = 0;
          state.startedAt = state.running ? Date.now() : null;
        } else if (msg.action === "adjust") {
          state.elapsedMs = Math.max(0, elapsedNow() + Number(msg.seconds || 0) * 1000);
          state.startedAt = state.running ? Date.now() : null;
        }
        break;
    }
    sendState();
  });
});

setInterval(sendState, 250);

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => console.log(`Tabela pornită pe portul ${port}`));
