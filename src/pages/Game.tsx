import { useRef, useState } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';
import initCamera from '../utils/initCamera';
import useCamera from '../hooks/useCamera';
import getRandomGesture from '../utils/getRandomGesture';
import Loader from '../components/Loader';

let gestureRecognizer: GestureRecognizer;

enum StatusEnum {
  'idle',
  'error',
  'success',
  'init'
}

type State = {
  status: StatusEnum.error | StatusEnum.idle | StatusEnum.success | StatusEnum.init,
  payload: unknown
};

function Game() {
  const [state, setState] = useState<State>({status: StatusEnum.init, payload: null});
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const {getFramingHandler} = useCamera();
  let camera: Camera;

  const handleStart = async () => {
    try {
      setState(({payload}) => ({status: StatusEnum.idle, payload}))
      gestureRecognizer = await loadGestureRecognizer()

      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(gestureRecognizer, videoRef.current as HTMLVideoElement)
      );
      setState(({payload}) => ({status: StatusEnum.success, payload}))
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
      <section className='game-players'>
        <article className='player-frame'>
          <span className='player-title'>Computer</span>
          <div className='game-player'>
            <img className='bot-avatar' src={getRandomGesture()} alt="" />
          </div>
        </article>

        <article className='player-frame'>
          <span className='player-title'>You</span>

          {state.status === StatusEnum.idle && (
            <Loader />
          )}

          <video
            hidden={state.status === StatusEnum.success ? false : true}
            playsInline
            ref={videoRef}
            className='video'
          ></video>

          {state.status === StatusEnum.init && (
            <div className='game-player'>
              <img className='user-avatar' src={getRandomGesture()} alt="" />
            </div>
          )}
        </article>
      </section>

      <button className='cta' onClick={handleStart}>Start Game!</button>
    </div>
  )
}

export default Game
