import { useEffect, useRef, useState } from "react";
import useCamera, { CameraStatusType } from "./useCamera";
import getUserResult from "../utils/getUserResult";
import { GestureRecognizer } from "@mediapipe/tasks-vision";
import loadGestureRecognizer from "../utils/loadGestureRecognizer";
import { Camera } from '@mediapipe/camera_utils';
import initCamera from "../utils/initCamera";

// eslint-disable-next-line react-refresh/only-export-components
export enum GameStatusEnum {
  "idle",
  "error",
  "success",
  "init",
  "done",
}

export type GameState = {
  status:
    | GameStatusEnum.done
    | GameStatusEnum.error
    | GameStatusEnum.idle
    | GameStatusEnum.success
    | GameStatusEnum.init;
  payload: unknown;
};

let gestureRecognizer: GestureRecognizer;

function useGame() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: Camera

  const [gameState, setGameState] = useState<GameState>({
    status: GameStatusEnum.init,
    payload: null,
  });
  const handleGameState = setGameState;

  const [countdown, setCountdown] = useState(3);

  const { getFramingHandler, cameraStatus } = useCamera(gameState.status);

  // if (gameState.status === GameStatusEnum.done) {
  //   (async function () {
  //     if (camera !== undefined) await camera.stop()
  //   })()
  // }

  const handleStart = async () => {
    try {
      handleGameState(({ payload }) => ({
        status: GameStatusEnum.idle,
        payload,
      }));
      gestureRecognizer = await loadGestureRecognizer();

      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(
          gestureRecognizer,
          videoRef.current as HTMLVideoElement
        )
      );
      handleGameState(({ payload }) => ({
        status: GameStatusEnum.success,
        payload,
      }));
      await camera.start();
    } catch (error) {
      handleGameState(() => ({ status: GameStatusEnum.error, payload: error }));
    }
  };

  useEffect(() => {
    (async function () {
      if (cameraStatus === CameraStatusType.showingHands && countdown > 0) {
        setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }

      if (countdown === 0) {
        const result = await getUserResult(
          videoRef.current as HTMLVideoElement,
          gestureRecognizer
        );
        console.log(result);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, cameraStatus]);

  return {
    gameState,
    handleGameState,
    countdown,
    getFramingHandler,
    cameraStatus,
    handleStart,
    videoRef
  };
}

export default useGame;
