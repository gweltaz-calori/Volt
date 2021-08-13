const io = require("socket.io-client");
const { clipboard } = require("electron");

const socket = io("http://localhost:3000");

let session = null;
let remoteConnection;
let devicesEl = document.querySelector("#devices");
let startButton = document.querySelector(".start-streaming");
let copyButton = document.querySelector(".copy");

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

  return devices;
}

getDevices();

copyButton.addEventListener("click", async () => {
  clipboard.writeText("http://localhost:3000/" + session.session_id);
});

startButton.addEventListener("click", async () => {
  const devices = await getDevices();
  const device = devices.find((device) => device.deviceId === devicesEl.value);
  navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
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
    socket.emit("create:session");
    socket.on("session:created", (newSession) => {
      session = newSession;
      console.log("Session Started");
      copyButton.style.display = "inline";
    });
    socket.on("offer", (offer) => {
      remoteConnection = new RTCPeerConnection();
      audioStream
        .getAudioTracks()
        .forEach((track) => remoteConnection.addTrack(track, audioStream));
      remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          socket.emit("candidate", { socket_id: offer.socket_id, candidate });
      };
      remoteConnection
        .setRemoteDescription(offer.description)
        .then(() => remoteConnection.createAnswer())
        .then(async (answer) => {
          answer.sdp = answer.sdp.replace(
            "useinbandfec=1",
            "useinbandfec=1; stereo=1; maxaveragebitrate=510000"
          );
          return await remoteConnection.setLocalDescription(answer);
        })
        .then(() => {
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
