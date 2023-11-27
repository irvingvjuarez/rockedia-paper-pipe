import { GestureRecognizer } from "@mediapipe/tasks-vision"
import { FinalResultEnum } from "../global.enum";

async function getUserResult(videoEl: HTMLVideoElement, gestureRecognizer: GestureRecognizer): UserResult {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  }
  const results = await gestureRecognizer.recognize(canvas);
  const gestures = results.gestures;

  if (gestures.length === 0) return {
    categoryName: FinalResultEnum.None
  }

  const result = gestures[0][0] as unknown as UserResult;
  // const captureImage = canvas.toDataURL("image/jpeg");
  return result;

}

export default getUserResult;