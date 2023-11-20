const possibleResults = [
    "https://storage.googleapis.com/khanhlvg_ml/rock_paper_scissor/paper.mp4",
    "https://storage.googleapis.com/khanhlvg_ml/rock_paper_scissor/rock.mp4",
    "https://storage.googleapis.com/khanhlvg_ml/rock_paper_scissor/scissors.mp4"
]

function getComputerResult() {
    const result = Math.floor(Math.random() * possibleResults.length);
    return possibleResults[result];
}

export default getComputerResult;