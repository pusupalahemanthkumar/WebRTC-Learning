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
const getConnectedDevices=(type,callback)=>{
  navigator.mediaDevices.enumerateDevices()
  .then(devices=>{
    const filteredData = devices.filter(device=>{
      return device.kind===type
    })
    callback(filteredData);
   })

}

getConnectedDevices('videoinput',cameras=>{
  if(cameras){
    console.log("cameras found",cameras);
  }
})

