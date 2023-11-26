type PlayerFrameProps = {
    role: 'user' | 'bot',
    children: React.ReactNode
}

function PlayerFrame({role, children}: PlayerFrameProps) {
    return (
        <article className='player-frame'>
            <span className='player-title'>
                {role === 'bot' ? 'Computer' : "You"}
            </span>

            {children}
        </article>
    );
}

export default PlayerFrame;