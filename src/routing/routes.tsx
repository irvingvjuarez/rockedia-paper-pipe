import ErrorHandler from "../components/ErrorHandler";
import Game from "../pages/Game";
import Home from "../pages/Home";

const routes = [
    {
        "path": "/",
        element: <Home />,
        errorElement: <ErrorHandler />
    },
    {
        "path": "/game",
        element: <Game />,
        errorElement: <ErrorHandler />
    }
]

export default routes;