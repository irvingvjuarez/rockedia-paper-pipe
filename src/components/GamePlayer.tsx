import getRandomGesture from "../utils/getRandomGesture";

type GamePlayerProps = {
    role?: 'user' | 'bot'
}

function GamePlayer({role = 'user'}: GamePlayerProps) {
    return (
        <div className='game-player'>
            <img
                className={role === 'bot' ? 'bot-avatar' : 'user-avatar'}
                src={getRandomGesture()}
                alt="Hand gesture"
            />
        </div>
    );
}

export default GamePlayer;