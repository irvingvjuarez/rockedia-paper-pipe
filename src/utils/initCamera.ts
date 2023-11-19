import { Camera } from "@mediapipe/camera_utils";

function initCamera(htmlEl: HTMLVideoElement, onCameraFraming: () => Promise<void>): Camera {
    const camera = new Camera(htmlEl, {
      onFrame: onCameraFraming
    });

    return camera;
}

export default initCamera;