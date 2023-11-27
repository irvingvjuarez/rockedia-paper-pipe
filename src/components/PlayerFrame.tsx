import GameContext from "../contexts/game.context";
import { useContext, useEffect, useState } from "react";
import { FinalResultEnum, GameStatusEnum } from "../global.enum";

type PlayerFrameProps = {
    role: 'user' | 'bot',
    children: React.ReactNode
}

function PlayerFrame({role, children}: PlayerFrameProps) {
    const context = useContext(GameContext);
    const [result, setResult] = useState<null | number>(null);


    useEffect(() => {
        if (context?.status === GameStatusEnum.result) {
            switch(context.payload) {
                case FinalResultEnum.Win:
                    if (!result && role === 'user')
                        setResult(1);
                    else if (role === 'user')
                        setResult(prev => prev + 1);
                    break;
                case FinalResultEnum.Lose:
                    if (!result && role === 'bot')
                        setResult(1);
                    else if (role === 'bot')
                        setResult(prev => prev + 1);
                    break;
                default:
                    if (!result) setResult(0);
            }
        }
    }, [context?.payload, context?.status])

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