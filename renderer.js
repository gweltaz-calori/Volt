const io = require("socket.io-client");
const socket = io("http://localhost:3000");

let session = null;
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
      /* deviceId: { exact: device.deviceId }, */
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
    remoteConnection = new RTCPeerConnection();
    audioStream
      .getAudioTracks()
      .forEach((track) => remoteConnection.addTrack(track, audioStream));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate &&
        socket.emit("candidate", { socket_id: offer.socket_id, candidate });
    };
    console.log(offer.description);
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
        console.log(remoteConnection.localDescription);
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
