const axios = require("axios");
const io = require("socket.io-client");
const socket = io("http://localhost:3000");
const socketBlob = require("engine.io-client")("ws://localhost:3000");
socket.binaryType = "blob";

/* let session = null;
let remoteConnection;

navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  const [track] = stream.getTracks();
  let devices = await await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter((device) => device.kind == "audioinput");
  const device = devices.find(({ kind, label }) =>
    label.includes("VoiceMeeter")
  );
  track.stop();
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      channelCount: 2,
      echoCancellation: false,
      latency: 0,
      noiseSuppression: false,
      sampleRate: 48000,
      sampleSize: 16,
      volume: 1.0,
      deviceId: { exact: device.deviceId },
    },
    video: false,
  });
  document.querySelector("audio").srcObject = audioStream;
  socket.emit("create:session");
  socket.on("session:created", (newSession) => {
    session = newSession;
    console.log("http://localhost:3000/" + session.session_id);
  });
  socket.on("offer", (offer) => {
    console.log("received offer");
    remoteConnection = new RTCPeerConnection();

    audioStream
      .getAudioTracks()
      .forEach((track) => remoteConnection.addTrack(track, audioStream));

    remoteConnection.onicecandidate = ({ candidate }) => {
      console.log("candidate");
      candidate &&
        socket.emit("candidate", { socket_id: offer.socket_id, candidate });
    };

    console.log(offer.description);
    remoteConnection
      .setRemoteDescription(offer.description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        console.log("emit answer");
        socket.emit("answer", {
          socket_id: offer.socket_id,
          description: remoteConnection.localDescription,
        });
      });
  });

  socket.on("candidate", (candidate) => {
    const conn = remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });
}); */

const WebSocket = require("ws");

const ws = new WebSocket(`ws://localhost:3000`);

navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  const [track] = stream.getTracks();
  let devices = await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter((device) => device.kind == "audioinput");
  const device = devices.find(({ kind, label }) =>
    label.includes("VoiceMeeter")
  );
  track.stop();
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      channelCount: 2,
      echoCancellation: false,
      latency: 0,
      noiseSuppression: false,
      sampleRate: 48000,
      sampleSize: 16,
      volume: 1.0,
      /* deviceId: { exact: device.deviceId }, */
    },
    video: false,
  });
  document.querySelector("audio").srcObject = audioStream;
  var media = new MediaRecorder(audioStream);

  media.start(1000);
  ws.send(
    JSON.stringify({
      type: "create:session",
    })
  );

  async function onSessionCreated(data) {
    session = data.session;
    console.log(media);
    media.ondataavailable = async (e) => {
      console.log(e.data);
      ws.send(await e.data.arrayBuffer());
    };
    console.log("http://localhost:3000/" + session.session_id);
  }

  ws.on("message", (res) => {
    const message = JSON.parse(res);
    switch (message.type) {
      case "session:created":
        onSessionCreated(message.data);
        break;
      default:
        break;
    }
  });
});
