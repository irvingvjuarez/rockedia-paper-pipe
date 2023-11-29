import { GameStatusEnum } from "./global.enum";

// Game state
type GameState = {
  status:
    | GameStatusEnum.done
    | GameStatusEnum.error
    | GameStatusEnum.idle
    | GameStatusEnum.success
    | GameStatusEnum.init
    | GameStatusEnum.over
    | GameStatusEnum.result;
  payload: unknown;
};

// User results
type UserResult = {
  categoryName: FinalResultEnum
}

// Reducer Action
type ReducerAction = {
  type: GameStatusEnum,
  payload?: unknown
}