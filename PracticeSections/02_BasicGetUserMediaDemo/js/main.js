// Getting DOM Here.
const video = document.querySelector("video");
const canvas = document.querySelector("canvas");
const btn = document.querySelector("button");
const snapshotButton = document.querySelector('button#snapshot');
const filterSelect = document.querySelector('select#filter');

canvas.width = 480;
canvas.height = 360;

// Event Handling Here.
btn.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.className = filterSelect.value;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
});

filterSelect.onchange = function () {
  video.className = filterSelect.value;
};


// Defining Constraints Here.
const constraints = {
  audio: false,
  video: true,
};
const handleSuccess = (stream) => {
  video.srcObject = stream;
};
const handleError = (error) => {
  console.log(error.message);
};

// Main Logic
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => handleSuccess(stream))
  .catch((err) => handleError(err));
