require("dotenv").config();
const io = require("socket.io-client");
const { clipboard } = require("electron");

const socket = io(process.env.SERVER_URL);

let devicesEl = document.querySelector("#devices");
let startButton = document.querySelector(".start-streaming");
let copyButton = document.querySelector(".copy");
let loader = document.querySelector(".loader");
let center = document.querySelector(".center");
let stopIcon = document.querySelector(".stop-icon");
let startIcon = document.querySelector(".start-icon");
let recordText = document.querySelector(".record-text");

let isStreaming = false;
let session = null;
let remoteConnection;
let localConnection;
let audioStream = null;
let users = [];

const iceConfiguration = {
  iceServers: [
    {
      url: "stun:stun.l.google.com:19302",
    },
    {
      url: "turn:192.158.29.39:3478?transport=udp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
    {
      url: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
  ],
};

async function getDevices() {
  let devices = await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter(
    (device) =>
      device.kind == "audioinput" && device.deviceId !== "communications"
  );

  for (let device of devices) {
    let option = document.createElement("option");
    option.value = device.deviceId;
    option.label = device.label;

    devicesEl.appendChild(option);
  }

  if (localStorage.getItem("defaultDevice")) {
    devicesEl.value = localStorage.getItem("defaultDevice");
  }

  return devices;
}

devicesEl.addEventListener("change", () => {
  localStorage.setItem("defaultDevice", devicesEl.value);
});

getDevices();

copyButton.addEventListener("click", async () => {
  clipboard.writeText(process.env.SERVER_URL + "/" + session.session_id);
});

socket.emit("create:session");
socket.on("session:created", onSessionCreated);
socket.on("users", onUsers);

function onUsers(newUsers) {
  users = newUsers;
}

function onSessionCreated(newSession) {
  session = newSession;
  loader.style.display = "none";
  center.style.display = "flex";
}

function onCandidate(candidate) {
  console.log("on candidate");
  let connection = localConnection || remoteConnection;

  connection.addIceCandidate(new RTCIceCandidate(candidate));
}

async function onOffer(offer) {
  console.log("on offer");
  remoteConnection = new RTCPeerConnection(iceConfiguration);
  audioStream
    .getAudioTracks()
    .forEach((track) => remoteConnection.addTrack(track, audioStream));
  remoteConnection.onicecandidate = ({ candidate }) => {
    candidate &&
      socket.emit("candidate", {
        socket_id: offer.socket_id,
        candidate,
      });
  };
  await remoteConnection.setRemoteDescription(offer.description);
  const answer = await remoteConnection.createAnswer();
  answer.sdp = answer.sdp.replace(
    "useinbandfec=1",
    "useinbandfec=1; stereo=1; maxaveragebitrate=510000"
  );
  await remoteConnection.setLocalDescription(answer);
  socket.emit("answer", {
    socket_id: offer.socket_id,
    description: remoteConnection.localDescription,
  });
}

async function onAnswer(answer) {
  console.log("on answer");
  localConnection.setRemoteDescription(answer.description);
}

async function startStreaming() {
  stopIcon.style.display = "block";
  startIcon.style.display = "none";
  recordText.textContent = "Recording";

  audioStream = await getLocalStreamFromDevice();

  socket.on("offer", onOffer);
  socket.on("candidate", onCandidate);
  socket.on("answer", onAnswer);

  showCopyButton();

  if (users.length === 0) return;
  initLocalConnection();
}

async function initLocalConnection() {
  console.log("init local connection");
  localConnection = new RTCPeerConnection(iceConfiguration);

  audioStream
    .getAudioTracks()
    .forEach((track) => localConnection.addTrack(track, audioStream));

  localConnection.onicecandidate = ({ candidate }) => {
    for (let user of users) {
      candidate &&
        socket.emit("candidate", {
          socket_id: user,
          candidate,
        });
    }
  };

  const offer = await localConnection.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: false,
  });
  offer.sdp = offer.sdp.replace("useinbandfec=1", "useinbandfec=1; stereo=1");
  await localConnection.setLocalDescription(offer);
  socket.emit("session:offer", {
    session_id: session.session_id,
    description: localConnection.localDescription,
  });
}

function showCopyButton() {
  copyButton.style.display = "inline";
}

function hideCopyButton() {
  copyButton.style.display = "none";
}

async function getLocalStreamFromDevice() {
  let devices = await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter(
    (device) =>
      device.kind == "audioinput" && device.deviceId !== "communications"
  );
  const device = devices.find((device) => device.deviceId === devicesEl.value);
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const [track] = stream.getTracks();
  track.stop();
  return await navigator.mediaDevices.getUserMedia({
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
}

function stopStreaming() {
  stopIcon.style.display = "none";
  startIcon.style.display = "block";
  recordText.textContent = "Record";

  remoteConnection && remoteConnection.close();
  localConnection && localConnection.close();

  console.log("STOPING STREAMING ", session);
  socket.off("offer");
  socket.off("candidate");
  socket.off("answer");

  socket.emit("close-connection", {
    session,
  });

  isStreaming = false;
  remoteConnection = null;
  localConnection = null;
  audioStream = null;
  hideCopyButton();
}

startButton.addEventListener("click", async () => {
  if (!session) return;
  isStreaming = !isStreaming;
  if (isStreaming) {
    startStreaming();
    socket.emit("session-status", {
      session_id: session.session_id,
      started: true,
    });
  } else {
    stopStreaming();
    socket.emit("session-status", {
      session_id: session.session_id,
      started: false,
    });
  }
});
