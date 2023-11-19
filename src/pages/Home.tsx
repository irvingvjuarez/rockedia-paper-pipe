import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h2>Home page</h2>
            <Link to="/game">
                Let's play
            </Link>
        </div>
    )
}

export default Home;