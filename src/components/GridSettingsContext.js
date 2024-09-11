import { createContext } from "react";

const GridSettingsContext = createContext();

export default GridSettingsContext;

export const gridSizeOptions = Array.from({ length: 6 }, (_, i) => i + 5);

export const difficultyOptions = ["Easy", "Medium", "Hard"];
