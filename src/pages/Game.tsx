import { useRef, useState } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';
import initCamera from '../utils/initCamera';
import useCamera from '../hooks/useCamera';
import getRandomGesture from '../utils/getRandomGesture';

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
  const {getFramingHandler} = useCamera();
  let camera: Camera;

  const handleStart = async () => {
    try {
      gestureRecognizer = await loadGestureRecognizer()

      setState(({payload}) => ({status: StatusEnum.success, payload}))
      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(gestureRecognizer, videoRef.current as HTMLVideoElement)
      );
      await camera.start()
    } catch(error) {
      setState(() => ({status: StatusEnum.error, payload: error}));
    }
  }

  if (state.status === StatusEnum.error) {
    throw new Error((state.payload as Error).message);
  }

  return (
    <div className='game'>
      {/* <video playsInline ref={videoRef}></video> */}
      <section className='game-players'>
        <article>
          <span>Computer</span>
          <div className='game-player'>
            <img className='bot-avatar' src={getRandomGesture()} alt="" />
          </div>
        </article>

        <article>
          <span>You</span>
          <div className='game-player'>
            <img className='user-avatar' src={getRandomGesture()} alt="" />
          </div>
        </article>
      </section>

      <button className='cta' onClick={handleStart}>Start Game!</button>
    </div>
  )
}

export default Game
