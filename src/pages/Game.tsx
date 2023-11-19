import { useRef, useState } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';
import initCamera from '../utils/initCamera';

let gestureRecognizer: GestureRecognizer;

enum StatusEnum {
  'idle',
  'error',
  'success'
}

type State = {
  status: StatusEnum.error | StatusEnum.idle | StatusEnum.success,
  payload: unknown
};

function Game() {
  const [state, setState] = useState<State>({status: StatusEnum.idle, payload: null});
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: Camera;

  const handleStart = async () => {
    try {
      gestureRecognizer = await loadGestureRecognizer()
      camera = initCamera(videoRef.current as HTMLVideoElement);
      await camera.start()
    } catch(error) {
      setState(() => ({status: StatusEnum.error, payload: error}));
    }
  }

  if (state.status === StatusEnum.error) {
    throw new Error((state.payload as Error).message);
  }

  return (
    <>
      <video playsInline ref={videoRef}></video>

      <button onClick={handleStart}>Start Game!</button>
    </>
  )
}

export default Game
