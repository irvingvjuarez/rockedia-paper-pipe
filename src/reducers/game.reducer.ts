import { GameStatusEnum } from "../global.enum";
import { GameState, ReducerAction, UserResult } from "../type";
import doesUserWin from "../utils/doesUserWin";
import getComputerResult from "../utils/getComputerResult";

function gameReducer(state: GameState, action: ReducerAction): GameState {
    switch (action.type) {
        case GameStatusEnum.idle: return { status: action.type, payload: getComputerResult() }
        case GameStatusEnum.success: return { status: action.type, payload: action.payload || state.payload }
        case GameStatusEnum.error: return { status: action.type, payload: action.payload }
        case GameStatusEnum.result: return { status: action.type, payload: doesUserWin(state.payload as string, action.payload as UserResult) }
        default: throw new Error('Unexpected Action')
    }
}

export default gameReducer;