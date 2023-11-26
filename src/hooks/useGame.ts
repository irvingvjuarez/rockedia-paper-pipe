import { useEffect, useRef, useState, useReducer, Reducer } from "react";
import useCamera, { CameraStatusType } from "./useCamera";
import getUserResult from "../utils/getUserResult";
import { GestureRecognizer } from "@mediapipe/tasks-vision";
import loadGestureRecognizer from "../utils/loadGestureRecognizer";
import { Camera } from '@mediapipe/camera_utils';
import initCamera from "../utils/initCamera";
import { GameStatusEnum } from "../global.enum";
import gameReducer from "../reducers/game.reducer";
import { GameState, ReducerAction } from "../type";

let gestureRecognizer: GestureRecognizer;

function useGame() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: Camera

  const [gameState, dispatch] = useReducer<Reducer<GameState, ReducerAction>>(gameReducer, {
    status: GameStatusEnum.init,
    payload: null
  })

  const [countdown, setCountdown] = useState(3);
  const { getFramingHandler, cameraStatus } = useCamera(gameState.status);

  const handleStart = async () => {
    try {
      dispatch({type: GameStatusEnum.idle})
      gestureRecognizer = await loadGestureRecognizer();

      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(
          gestureRecognizer,
          videoRef.current as HTMLVideoElement
        )
      );

      dispatch({type: GameStatusEnum.success})
      await camera.start();
    } catch (error) {
      dispatch({type: GameStatusEnum.error, payload: error});
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

        dispatch({type: GameStatusEnum.result, payload: result});
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
