import { useEffect, useRef, useState } from 'react'
import { GestureRecognizer } from "@mediapipe/tasks-vision"
import '../App.css'
import { Camera } from '@mediapipe/camera_utils';
import loadGestureRecognizer from '../utils/loadGestureRecognizer';
import initCamera from '../utils/initCamera';
import useCamera, { CameraStatusType } from '../hooks/useCamera';
import getRandomGesture from '../utils/getRandomGesture';
import Loader from '../components/Loader';
import getComputerResult from '../utils/getComputerResult';
import getUserResult from '../utils/getUserResult';

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
  const [countdown, setCountdown] = useState(3);
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

  useEffect(() => {
    if (cameraStatus === CameraStatusType.showingHands && countdown > 0) {
      setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000)
    }

    if (countdown === 0) {
      getUserResult(videoRef.current as HTMLVideoElement, gestureRecognizer)
        .then(value => console.log(value))
    }
  }, [cameraStatus, countdown])

  return (
    <div className='game'>
      <section className='game-players'>
        <article className='player-frame'>
          <span className='player-title'>Computer</span>
          {cameraStatus === CameraStatusType.showingHands ? (
            <div className='video-container'>
              <video autoPlay playsInline className='video'>
                <source
                  src={getComputerResult()}
                  type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className='game-player'>
              <img
                className='bot-avatar'
                src={getRandomGesture()}
                alt=""
              />
            </div>
          )}
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

            {cameraStatus === CameraStatusType.showingHands && countdown > 0 && (
              <div className='video-message'>
                {countdown}
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
