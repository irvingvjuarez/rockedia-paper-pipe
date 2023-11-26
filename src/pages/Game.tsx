import '../App.css'
import { CameraStatusType } from '../hooks/useCamera';
import Loader from '../components/Loader';
import getComputerResult from '../utils/getComputerResult';
import useGame from '../hooks/useGame';
import { GameStatusEnum } from '../global.enum';
import GamePlayer from '../components/GamePlayer';

function Game() {
  const {
    gameState,
    countdown,
    cameraStatus, isGameStatus,
    handleStart, videoRef
  } = useGame();
  const isStatusSuccess = gameState.status === GameStatusEnum.success || gameState.status === GameStatusEnum.result;

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
            <GamePlayer role='bot' />
          )}
        </article>

        <article className='player-frame'>
          <span className='player-title'>You</span>

          {isGameStatus(GameStatusEnum.idle) && (
            <Loader />
          )}

          <div
            className='video-container'
            hidden={isStatusSuccess ? false : true}
          >
            {isGameStatus(GameStatusEnum.result) && (
              <div className='video-message'>
                {gameState.payload as string}
              </div>
            )}

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

          {isGameStatus(GameStatusEnum.init) && (
            <GamePlayer />
          )}
        </article>
      </section>

      <button className='cta' onClick={handleStart}>Start Game!</button>
    </div>
  )
}

export default Game
