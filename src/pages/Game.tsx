import '../App.css'
import useGame from '../hooks/useGame';
import { GameStatusEnum } from '../global.enum';
import GameContext from '../contexts/game.context';
import GameHandlers from '../components/GameHandlers';
import GamePlayers from '../containers/GamePlayers';

function Game() {
  const {
    gameState, handleFinish,
    countdown, isCameraStatus,
    isGameStatus, handleNext,
    handleStart, videoRef,
    dispatch
  } = useGame();

  if (gameState.status === GameStatusEnum.error) {
    throw new Error((gameState.payload as Error).message);
  }
  const initialGameState = {...gameState, dispatch}

  return (
    <GameContext.Provider value={initialGameState}>
      <div className='game'>
        <GamePlayers
          isCameraStatus={isCameraStatus}
          isGameStatus={isGameStatus}
          videoRef={videoRef}
          countdown={countdown}
        />

        <GameHandlers
          onStart={handleStart}
          onFinish={handleFinish}
          onNext={handleNext}
        />
      </div>
    </GameContext.Provider>
  )
}

export default Game
