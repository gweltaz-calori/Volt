require("dotenv").config();
const io = require("socket.io-client");
const { clipboard } = require("electron");

const socket = io(process.env.SERVER_URL);

let session = null;
let remoteConnection;
let devicesEl = document.querySelector("#devices");
let startButton = document.querySelector(".start-streaming");
let copyButton = document.querySelector(".copy");
let loader = document.querySelector(".loader");
let center = document.querySelector(".center");

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
console.log("creating session");
socket.on("session:created", (newSession) => {
  session = newSession;
  console.log("Session Started");
  loader.style.display = "none";
  center.style.display = "flex";

  startButton.addEventListener("click", async () => {
    /* if (startButton.textContent === "Stop Streaming") {
      remoteConnection.close();
      remoteConnection = null;
      startButton.textContent = "Start Streaming";
      socket.emit("close-connection", {
        session,
      });
      return;
    } */

    let devices = await navigator.mediaDevices.enumerateDevices();
    devices = devices.filter(
      (device) =>
        device.kind == "audioinput" && device.deviceId !== "communications"
    );
    const device = devices.find(
      (device) => device.deviceId === devicesEl.value
    );

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async (stream) => {
        const [track] = stream.getTracks();
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
        console.log("got media");
        copyButton.style.display = "inline";
        //startButton.textContent = "Stop Streaming";
        socket.on("offer", (offer) => {
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
          remoteConnection
            .setRemoteDescription(offer.description)
            .then(() => remoteConnection.createAnswer())
            .then(async (answer) => {
              answer.sdp = answer.sdp.replace(
                "useinbandfec=1",
                "useinbandfec=1; stereo=1; maxaveragebitrate=510000"
              );
              console.log("sending :", answer);
              return await remoteConnection.setLocalDescription(answer);
            })
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
      });
  });
});
