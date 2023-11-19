import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision"
import config from "../config";

const options = {
    baseOptions: {
        modelAssetPath: config.recognizerModelPath,
        numHands: 1
    }
}

async function loadGestureRecognizer () {
    const vision = await FilesetResolver.forVisionTasks(config.visionBasePath);

    const gestureRecognizer = await GestureRecognizer.createFromOptions(
        vision,
        options
    );

    return gestureRecognizer;
}

export default loadGestureRecognizer;