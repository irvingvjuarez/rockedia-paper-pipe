// Game state
type GameState = {
  status:
    | GameStatusEnum.done
    | GameStatusEnum.error
    | GameStatusEnum.idle
    | GameStatusEnum.success
    | GameStatusEnum.init
    | GameStatusEnum.result;
  payload: unknown;
};

// User results
type UserResult = {
  categoryName: FinalResultEnum
}
