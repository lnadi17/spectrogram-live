function GetStream() : Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({video: false, audio: true});
}

export default GetStream;