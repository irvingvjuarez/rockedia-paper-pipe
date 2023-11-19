import { Camera } from "@mediapipe/camera_utils";

async function handleCameraFraming () {

}

function initCamera(htmlEl: HTMLVideoElement): Camera {
    const camera = new Camera(htmlEl, {
      onFrame: handleCameraFraming,
      width: 1280,
      height: 720
    });

    return camera;
}

export default initCamera;