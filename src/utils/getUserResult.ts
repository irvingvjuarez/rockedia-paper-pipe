import { GestureRecognizer } from "@mediapipe/tasks-vision"

async function getUserResult(videoEl: HTMLVideoElement, gestureRecognizer: GestureRecognizer) {
  const canvas = document.createElement("canvas");
  let result;
  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  }
  const results = await gestureRecognizer.recognize(canvas);
  const gestures = results.gestures;
  if (gestures.length == 1) {
    result = gestures[0][0];
  }
  // const captureImage = canvas.toDataURL("image/jpeg");
  return result;
}

export default getUserResult;