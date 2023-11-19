import { Camera } from "@mediapipe/camera_utils";

function initCamera(htmlEl: HTMLVideoElement, onCameraFraming: () => Promise<void>): Camera {
    const camera = new Camera(htmlEl, {
      onFrame: onCameraFraming,
      width: 1280,
      height: 720
    });

    return camera;
}

export default initCamera;