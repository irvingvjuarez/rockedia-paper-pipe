type ErrorHandlerProps = {
    error: Error
}

function ErrorHandler({error}: ErrorHandlerProps) {
    return (
        <div role="alert">
            <p>An error Ocurred</p>
            <pre>{error.message}</pre>
        </div>
    )
}

export default ErrorHandler;