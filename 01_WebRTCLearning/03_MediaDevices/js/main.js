/* Introduction To Media Constraints   */

async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight}
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}

const camerasData = getConnectedDevices('videoinput');
camerasData.then((cameras)=>{
    if (cameras && cameras.length > 0) {
        // Open first available video camera with a resolution of 1280x720 pixels
        const streamData = openCamera(cameras[0].deviceId, 1280, 720);
        streamData
        .then((stream)=>{
            console.log(stream);

        })
    }

})
