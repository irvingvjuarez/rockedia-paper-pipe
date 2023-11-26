import { createContext } from "react";
import { GameState } from "../type";

const GameContext = createContext<null | GameState>(null);

export default GameContext;