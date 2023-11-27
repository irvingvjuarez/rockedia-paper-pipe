import { useContext } from "react";
import GameContext from "../contexts/game.context";
import { GameStatusEnum } from "../global.enum";

type GameHandlersProps = {
    onStart: () => void,
    onNext: () => void,
    onFinish: () => void
}

function GameHandlers({onStart, onNext, onFinish}: GameHandlersProps) {
    const context = useContext(GameContext);

    switch (context?.status) {
        case GameStatusEnum.init:
            return <button className='cta' onClick={onStart}>Start Game!</button>
        case GameStatusEnum.result || GameStatusEnum.success:
            return (
                <>
                    <button className='cta' onClick={onNext}>Next Shot</button>
                    <button className='cta' onClick={onFinish}>Finish game</button>
                </>
            )
        // case GameStatusEnum.over:
        //     return <button className='cta' onClick={onFinish}>Finish game</button>
        default: return null
    }
}

export default GameHandlers;