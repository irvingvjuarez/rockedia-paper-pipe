import GameContext from "../contexts/game.context";
import { useContext } from "react";
import { FinalResultEnum, GameStatusEnum } from "../global.enum";

type PlayerFrameProps = {
    role: 'user' | 'bot',
    children: React.ReactNode
}

function PlayerFrame({role, children}: PlayerFrameProps) {
    const context = useContext(GameContext);
    let result = null;

    if (context?.status === GameStatusEnum.result) {
        if (!result) result = 0;

        switch(context.payload) {
            case FinalResultEnum.Win:
                result = role === 'user' ? result + 1 : result;
                break;
            case FinalResultEnum.Lose:
                result = role === 'bot' ? result + 1 : result;
                break;
            default: result += 0;
        }
    }

    return (
        <article className='player-frame'>
            <span className='player-title'>
                {role === 'bot' ? 'Computer' : "You"}
                {result !== null ? `: ${result}` : null}
            </span>

            {children}
        </article>
    );
}

export default PlayerFrame;