import { useState } from "react";
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import handsOnScreen from "../utils/handsOnScreen";

enum StatusType {
    'waitHands'
}

type Status = StatusType.waitHands;

function useCamera() {
    const [status, setStatus] = useState<Status>(StatusType.waitHands);

    const getFramingHandler = (gestureRecognizer: GestureRecognizer, htmlEl: HTMLVideoElement) => {
        return async () => {
            if (status === StatusType.waitHands && handsOnScreen(gestureRecognizer, htmlEl)) {
                console.log('Showing hands')
            }
        }
    }

    return {
        getFramingHandler
    }
}

export default useCamera;