import { useEffect, useState } from "react";
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import handsOnScreen from "../utils/handsOnScreen";
import { GameStatusEnum } from "../global.enum";

export enum CameraStatusType {
    'waitHands',
    'showingHands',
    'pause'
}

type CameraStatus = CameraStatusType.pause | CameraStatusType.waitHands | CameraStatusType.showingHands | null;

function useCamera(status: GameState['status']) {
    const [cameraStatus, setCameraStatus] = useState<CameraStatus>(null);
    const handleCameraStatus = setCameraStatus;

    const getFramingHandler = (gestureRecognizer: GestureRecognizer, htmlEl: HTMLVideoElement) => {
        return async () => {
            if (handsOnScreen(gestureRecognizer, htmlEl)) {
                setCameraStatus(CameraStatusType.showingHands)
            }
        }
    }

    useEffect(() => {
        if (status === GameStatusEnum.success) {
            setCameraStatus(CameraStatusType.waitHands);
        }
    }, [status]);

    return {
        getFramingHandler,
        cameraStatus,
        handleCameraStatus
    }
}

export default useCamera;