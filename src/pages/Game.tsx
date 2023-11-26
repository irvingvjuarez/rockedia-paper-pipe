import '../App.css'
import { CameraStatusType } from '../hooks/useCamera';
import Loader from '../components/Loader';
import useGame from '../hooks/useGame';
import { GameStatusEnum } from '../global.enum';
import GamePlayer from '../components/GamePlayer';
import PlayerFrame from '../components/PlayerFrame';
import GameContext from '../contexts/game.context';
import GameHandlers from '../components/GameHandlers';

function Game() {
  const {
    gameState,
    countdown, isCameraStatus,
    isGameStatus, handleNext,
    handleStart, videoRef
  } = useGame();
  const isStatusSuccess = gameState.status === GameStatusEnum.success || gameState.status === GameStatusEnum.result;

  if (gameState.status === GameStatusEnum.error) {
    throw new Error((gameState.payload as Error).message);
  }

  return (
    <GameContext.Provider value={gameState}>
      <div className='game'>
        <section className='game-players'>
          <PlayerFrame role='bot'>
            {isCameraStatus(CameraStatusType.showingHands) ? (
              <div className='video-container'>
                <video autoPlay playsInline className='video'>
                  <source
                    src={gameState.payload as string}
                    type="video/mp4" />
                </video>
              </div>
            ) : (
              <GamePlayer role='bot' />
            )}
          </PlayerFrame>

          <PlayerFrame role='user'>
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

              {isCameraStatus(CameraStatusType.waitHands) && (
                <div className='video-message'>
                  Please show one hand to the camera
                </div>
              )}

              {isCameraStatus(CameraStatusType.showingHands) && countdown > 0 && (
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
          </PlayerFrame>
        </section>

        <GameHandlers
          onStart={handleStart}
          onFinish={() => console.log('Finished!')}
          onNext={handleNext}
        />
      </div>
    </GameContext.Provider>
  )
}

export default Game
