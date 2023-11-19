import { useRef } from 'react'
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision"
import './App.css'
import { Camera } from '@mediapipe/camera_utils';

let gestureRecognizer: GestureRecognizer;

function App() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  let camera: unknown;

  const handleCameraFraming = async () => {

  }

  const loadGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    gestureRecognizer = await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: "https://assets.codepen.io/9177687/rock_paper_scissor.task",
          numHands: 1
        }
      }
    )
  }

  const handleStart = async () => {
    await loadGestureRecognizer()
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

export default App
