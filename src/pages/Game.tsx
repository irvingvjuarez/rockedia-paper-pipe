import { useRef } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';

let gestureRecognizer: GestureRecognizer;

function Game() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: unknown;

  const handleCameraFraming = async () => {

  }

  const handleStart = async () => {
    gestureRecognizer = await loadGestureRecognizer()
    console.log('gesture recognizer ready!')
    // camera = new Camera(videoRef.current as HTMLVideoElement, {
    //   onFrame: handleCameraFraming,
    //   width: 1280,
    //   height: 720
    // }).start()
  }

  return (
    <>
      <video playsInline ref={videoRef}></video>

      <button onClick={handleStart}>Start Game!</button>
    </>
  )
}

export default Game
