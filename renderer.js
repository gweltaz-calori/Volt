navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
  const [track] = stream.getTracks();
  let devices = await await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter((device) => device.kind == "audioinput");
  console.log(devices);
  const device = devices.find(({ kind, label }) =>
    label.includes("VoiceMeeter")
  );
  console.log(device);
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
  document.querySelector("audio").onloadedmetadata = () => {
    document.querySelector("audio").play();
  };
});
