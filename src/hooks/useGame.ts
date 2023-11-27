import { useCallback, useEffect, useRef, useState, useReducer, Reducer } from "react";
import useCamera, { CameraStatusType } from "./useCamera";
import getUserResult from "../utils/getUserResult";
import { GestureRecognizer } from "@mediapipe/tasks-vision";
import loadGestureRecognizer from "../utils/loadGestureRecognizer";
import { Camera } from '@mediapipe/camera_utils';
import initCamera from "../utils/initCamera";
import { GameStatusEnum } from "../global.enum";
import gameReducer from "../reducers/game.reducer";
import { GameState, ReducerAction } from "../type";
import getComputerResult from "../utils/getComputerResult";
import { useNavigate } from "react-router-dom";

let gestureRecognizer: GestureRecognizer;
const INITIAL_COUNTDOWN = 3;

function useGame() {
  const navigate = useNavigate()
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: Camera

  const [gameState, dispatch] = useReducer<Reducer<GameState, ReducerAction>>(gameReducer, {
    status: GameStatusEnum.init,
    payload: null
  })
  const isGameStatus = (value: GameState["status"]) => gameState.status === value;

  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);
  const { getFramingHandler, cameraStatus, handleCameraStatus } = useCamera(gameState.status);
  const isCameraStatus = (value: CameraStatusType) => cameraStatus === value;

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

  const handleFinish = useCallback(async () => {
    await camera.stop();
    navigate('/');
  }, [camera])

  const handleNext = () => {
    dispatch({type: GameStatusEnum.success, payload: getComputerResult() })
    handleCameraStatus(CameraStatusType.waitHands)
    setCountdown(INITIAL_COUNTDOWN);
  }

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
    handleStart,
    videoRef,
    isGameStatus,
    isCameraStatus,
    handleNext,
    handleFinish
  };
}

export default useGame;
