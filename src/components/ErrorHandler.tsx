import { useRouteError, Navigate } from "react-router-dom"

enum ErrorEnum {
    cameraNotAllowed = 'Permission denied'
}

function ErrorHandler() {
    const error = useRouteError() as Error;

    if (error.message === ErrorEnum.cameraNotAllowed) {
        navigator
        .mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            <Navigate to="/game" />
        })
        .catch(error => {
            console.log(error)
        })

        return (
            <div role="alert">
                <h2>Please provide Permissions to access the camera</h2>
                <p>
                    Camera is important to identify your hands gestures at the moment to play the game
                </p>
            </div>
        )
    }

    return (
        <div role="alert">
            <p>An error Ocurred</p>
            <pre>{error.message}</pre>
        </div>
    )
}

export default ErrorHandler;