/* INTRODUCTION TO WEBRTC */

/* To Simply Open The Default Microphone and Camera . */

// Defining Constraints Constant Here.
/* 
Explaination :
The call to getUserMedia() will trigger a permissions request.
If the user accepts the permission, the promise is resolved with a MediaStream containing one video and one audio track. 
If the permission is denied, a PermissionDeniedError is thrown. 
In case there are no matching devices connected, a NotFoundError will be thrown.
*/

const constraints = {
  video: true,
  audio: true,
};
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    console.log("Got MediaStream :", stream);
  })
  .catch((err) => {
    console.log("Error accessing The MediaDevices", err);
  });

/* we will most likely want to check all the connected cameras and microphones and provide the appropriate feedback to the user   */
// const getConnectedDevices=(type,callback)=>{
//   navigator.mediaDevices.enumerateDevices()
//   .then(devices=>{
//     console.log(devices);
//     const filteredData = devices.filter(device=>{
//       return device.kind===type
//     })
//     callback(filteredData);
//    })

// }

// getConnectedDevices('videoinput',cameras=>{
//   if(cameras){
//     console.log("cameras found",cameras);
//   }
// })

/*Listening for devices changes */
// Updates the select element with provided set of cameras
const updateCameraList = (camerasData) => {
  const listElement = document.getElementById("availableCameras");
  console.log(listElement);
  listElement.innerHTML = ``;
  camerasData.then(cameras=>{
    console.log(cameras);
    for(i=0;i<cameras.length;i++){
      console.log("data", cameras[i]);
      const cameraOption =document.createElement("option");
      cameraOption.label=cameras[i].label;
      cameraOption.value=cameras[i].deviceId;
      listElement.add(cameraOption);
    }
  })

 
};
// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
  console.log(devices.filter(device => device.kind === type));
  return devices.filter(device => device.kind === type)
}

// Get the initial set of cameras connected
const videoCameras = getConnectedDevices('videoinput');
updateCameraList(videoCameras);


// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
  const newCameraList = getConnectedDevices('video');
  updateCameraList(newCameraList);
});