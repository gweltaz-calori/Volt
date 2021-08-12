navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(async (stream) => {
    const [track] = stream.getTracks();
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const device = devices.find(({ kind, label }) => kind === "audiooutput");
    console.log(device);
    track.stop();
    return navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: device.deviceId } },
      video: false,
    });
  })
  .then((stream) => {
    //console.log(stream.getTracks()[0]);
    handleStream(stream);
    // do stuff
  })
  .catch(console.error);

function handleStream(stream) {
  const audioTracks = stream.getAudioTracks();
  console.log("Using audio device: " + audioTracks[0].label);
  const audio = document.querySelector("audio");
  audio.srcObject = stream;
  audio.onloadedmetadata = (e) => audio.play();
}
