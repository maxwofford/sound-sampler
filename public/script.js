// https://medium.com/jeremy-gottfrieds-tech-blog/javascript-tutorial-record-audio-and-encode-it-to-mp3-2eedcd466e78

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  handlerFunction(stream);
});

function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => {
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
      // recordedAudio.src = URL.createObjectURL(blob);
      recordedAudio.controls = true;
      recordedAudio.autoplay = true;
      sendData(blob);
    }
  };
}
async function sendData(data) {
  const body = new FormData()
  body.append('sound',data)
  const upload = await fetch('/upload-sound', {
    method: 'POST',
    body
  }).then(r => r.json())
  recordedAudio.src = upload.data.url
  copyboard.value = upload.data.url
}

copyClipboard.onclick = (e) => {
  // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  copyboard.value = recordedAudio.src
  copyboard.select()
  copyboard.setSelectionRange(0, 99999) /* For mobile devices */
  navigator.clipboard.writeText(copyboard.value)
}

record.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = true;
  record.style.backgroundColor = "blue";
  stopRecord.disabled = false;
  audioChunks = [];
  rec.start();
};
stopRecord.onclick = (e) => {
  console.log("I was clicked");
  record.disabled = false;
  stop.disabled = true;
  record.style.backgroundColor = "red";
  rec.stop();
};
