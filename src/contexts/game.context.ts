import { createContext } from "react";
import { GameState, ReducerAction } from "../type";

type InitialGameState = GameState & { dispatch: React.Dispatch<ReducerAction> }

const GameContext = createContext<null | InitialGameState>(null);

export default GameContext;