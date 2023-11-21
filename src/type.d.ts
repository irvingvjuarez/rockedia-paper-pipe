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

// eslint-disable-next-line react-refresh/only-export-components
enum GameStatusEnum {
  "idle",
  "error",
  "success",
  "init",
  "done",
  "result"
}

// User results
type UserResult = {
  categoryName: FinalResultEnum
}

enum FinalResultEnum {
  'Tie' = "It's a Tie",
  'Scissor' = 'Scissor',
  'Paper' = 'Paper',
  'Rock' = 'Rock',
  'None' = 'None',
  'Win' = 'You WIN',
  'Lose' = 'You LOSE'
}