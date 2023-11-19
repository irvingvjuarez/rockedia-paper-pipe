import { GestureRecognizer } from "@mediapipe/tasks-vision";

function handsOnScreen(gestureRecognizer: GestureRecognizer, htmlEl: HTMLVideoElement) {
    const gestures = gestureRecognizer.recognize(htmlEl);
    if (gestures.gestures.length === 0) return false;
    return true;
}

export default handsOnScreen;