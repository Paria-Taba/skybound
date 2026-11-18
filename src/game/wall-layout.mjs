export const WALL_ROW_HEIGHT=1.8;
// Recycle a complete two-color pattern so the same world row keeps its color.
export const wallOrigin=bottom=>Math.floor(bottom/(2*WALL_ROW_HEIGHT))*(2*WALL_ROW_HEIGHT);
