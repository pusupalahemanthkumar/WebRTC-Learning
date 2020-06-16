// Getting DOM Here.
const btnRecord =document.getElementById("btn");
const videoCaputuring =document.getElementById("video-capturing");
const errorMessage=document.getElementById("error-message");

// Defining Constraints Here.
const constraints = {
  audio: true,
  video: true,
};
// Utility Function To Handle Success Here.
const handleSuccess =(stream)=>{
    const videoTracks =stream.getVideoTracks();
    console.log(videoTracks);
    videoCaputuring.srcObject=stream;

}
// Utility Function To Handle Error Here.
const handleError=(error)=>{
    if (error.name === 'ConstraintNotSatisfiedError') {
        const v = constraints.video;
        errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      } else if (error.name === 'PermissionDeniedError') {
        errorMsg('Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.');
      }
      errorMsg(`getUserMedia error: ${error.name}`, error);


}
// Utility Function To Show Error Message To User Here.
const errorMsg=(msg,error)=>{
    errorMessage.innerHTML=`<p>${msg}</p>`;

}

// Main Code Here.
const init =async (event)=>{
    try{
        const stream =await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        event.target.disabled=true;


    }catch(err){
        handleError(err);
    }
}


// Event Handling Here.
btnRecord.addEventListener("click",(event)=>init(event))