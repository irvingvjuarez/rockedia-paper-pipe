import '../App.css'
import { CameraStatusType } from '../hooks/useCamera';
import getRandomGesture from '../utils/getRandomGesture';
import Loader from '../components/Loader';
import getComputerResult from '../utils/getComputerResult';
import useGame, { GameStatusEnum } from '../hooks/useGame';

function Game() {
  const {
    gameState,
    countdown,
    cameraStatus,
    handleStart, videoRef
  } = useGame();
  const isStatusSuccess = gameState.status === GameStatusEnum.success;

  if (gameState.status === GameStatusEnum.error) {
    throw new Error((gameState.payload as Error).message);
  }

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

          {gameState.status === GameStatusEnum.idle && (
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

          {gameState.status === GameStatusEnum.init && (
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
