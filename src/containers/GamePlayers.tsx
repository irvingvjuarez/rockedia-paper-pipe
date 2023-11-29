import GamePlayer from "../components/GamePlayer";
import Loader from "../components/Loader";
import PlayerFrame from "../components/PlayerFrame";
import GameContext from "../contexts/game.context";
import { GameStatusEnum } from "../global.enum";
import { CameraStatusType } from "../hooks/useCamera";
import { useContext } from "react"

type GamePlayersProps = {
    isCameraStatus: (value: CameraStatusType) => boolean,
    isGameStatus: (value: GameStatusEnum) => boolean,
    videoRef: React.MutableRefObject<HTMLVideoElement | null>,
    countdown: number
}

function GamePlayers({isCameraStatus, isGameStatus, videoRef, countdown}: GamePlayersProps) {
    const context = useContext(GameContext);
    const isStatusSuccess = isGameStatus(GameStatusEnum.success) || isGameStatus(GameStatusEnum.result);
    const isGameOver = isGameStatus(GameStatusEnum.over);

    return (
        <section className='game-players'>
          <PlayerFrame role='bot'>
            {isCameraStatus(CameraStatusType.showingHands) ? (
              <div className='video-container'>
                <video autoPlay playsInline className='video'>
                  <source
                    src={context?.payload as string}
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
              hidden={(isStatusSuccess || isGameOver) ? false : true}
            >
              {(isGameStatus(GameStatusEnum.result) || isGameOver) && (
                <div className='video-message'>
                  {context?.payload as string}
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
                hidden={(isStatusSuccess || isGameOver) ? false : true}
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
    );
}

export default GamePlayers