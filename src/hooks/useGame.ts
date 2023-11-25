import { useEffect, useRef, useState } from "react";
import useCamera, { CameraStatusType } from "./useCamera";
import getUserResult from "../utils/getUserResult";
import { GestureRecognizer } from "@mediapipe/tasks-vision";
import loadGestureRecognizer from "../utils/loadGestureRecognizer";
import { Camera } from '@mediapipe/camera_utils';
import initCamera from "../utils/initCamera";
import doesUserWin from "../utils/doesUserWin";
import getComputerResult from "../utils/getComputerResult";
import { GameStatusEnum } from "../global.enum";

let gestureRecognizer: GestureRecognizer;

function useGame() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: Camera

  const [gameState, setGameState] = useState<GameState>({
    status: GameStatusEnum.init,
    payload: null,
  });

  const [countdown, setCountdown] = useState(3);

  const { getFramingHandler, cameraStatus } = useCamera(gameState.status);

  // if (gameState.status === GameStatusEnum.done) {
  //   (async function () {
  //     if (camera !== undefined) await camera.stop()
  //   })()
  // }

  const handleStart = async () => {
    try {
      setGameState({
        status: GameStatusEnum.idle,
        payload: getComputerResult(),
      });
      gestureRecognizer = await loadGestureRecognizer();

      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(
          gestureRecognizer,
          videoRef.current as HTMLVideoElement
        )
      );
      setGameState(({ payload }) => ({
        status: GameStatusEnum.success,
        payload,
      }));
      await camera.start();
    } catch (error) {
      setGameState(() => ({ status: GameStatusEnum.error, payload: error }));
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

        const getFinalResult = (computerResult: string) => {
          const finalResult = doesUserWin(computerResult, result)
          return finalResult;
        }

        setGameState(prev => ({
          status: GameStatusEnum.result,
          payload: getFinalResult(prev.payload as string)
        }))
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, cameraStatus]);

  return {
    gameState,
    countdown,
    getFramingHandler,
    cameraStatus,
    handleStart,
    videoRef
  };
}

export default useGame;
