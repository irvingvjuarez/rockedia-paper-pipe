function doesUserWin(resultUrl: string, userResult: UserResult) {
    if (userResult === undefined || userResult.categoryName === FinalResultEnum.None) {
        return "Invalid hand gesture"
    }

    const userResultName = userResult.categoryName.toLowerCase()
    let [computerResultName] = resultUrl.match(/\w+\.mp4/i) as RegExpMatchArray;
    computerResultName = computerResultName.replace(".mp4", "").toLowerCase();

    if (computerResultName === userResultName) {
        return FinalResultEnum.Tie
    }

    if (computerResultName === FinalResultEnum.Scissor) {
        if (userResultName === FinalResultEnum.Paper) return FinalResultEnum.Lose
        return FinalResultEnum.Win
    }

    if (computerResultName === FinalResultEnum.Paper) {
        if (userResultName === FinalResultEnum.Rock) return FinalResultEnum.Lose
        return FinalResultEnum.Win
    }

    if (computerResultName === FinalResultEnum.Rock) {
        if (userResultName === FinalResultEnum.Scissor) return FinalResultEnum.Lose
        return FinalResultEnum.Win
    }
}

export default doesUserWin;