import { useRef, useState } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';
import initCamera from '../utils/initCamera';
import useCamera, { CameraStatusType } from '../hooks/useCamera';
import getRandomGesture from '../utils/getRandomGesture';
import Loader from '../components/Loader';

let gestureRecognizer: GestureRecognizer;

// eslint-disable-next-line react-refresh/only-export-components
export enum GameStatusEnum {
  'idle',
  'error',
  'success',
  'init'
}

export type GameState = {
  status: GameStatusEnum.error | GameStatusEnum.idle | GameStatusEnum.success | GameStatusEnum.init,
  payload: unknown
};

function Game() {
  const [state, setState] = useState<GameState>({status: GameStatusEnum.init, payload: null});
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const {getFramingHandler, cameraStatus} = useCamera(state.status);
  const isStatusSuccess = state.status === GameStatusEnum.success;
  let camera: Camera;

  const handleStart = async () => {
    try {
      setState(({payload}) => ({status: GameStatusEnum.idle, payload}))
      gestureRecognizer = await loadGestureRecognizer()

      camera = initCamera(
        videoRef.current as HTMLVideoElement,
        getFramingHandler(gestureRecognizer, videoRef.current as HTMLVideoElement)
      );
      setState(({payload}) => ({status: GameStatusEnum.success, payload}))
      await camera.start()
    } catch(error) {
      setState(() => ({status: GameStatusEnum.error, payload: error}));
    }
  }

  if (state.status === GameStatusEnum.error) {
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

          {state.status === GameStatusEnum.idle && (
            <Loader />
          )}

          <div
            className='video-container'
            hidden={isStatusSuccess ? false : true}
          >
            {cameraStatus === CameraStatusType.waitHands && (
              <div className='video-message'>
                Please show one hand to the camera
              </div>
            )}
            <video
              hidden={isStatusSuccess ? false : true}
              playsInline
              ref={videoRef}
              className='video'
            ></video>
          </div>

          {state.status === GameStatusEnum.init && (
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
