type HighScoreConfig = {
  baseScore: number;
  levelScaleFactor: number;
  maxTime: number;
};

class HighScore {
  private baseScore: number;
  private levelScaleFactor: number;
  private maxTime: number;

  constructor(config: HighScoreConfig) {
    this.baseScore = config.baseScore;
    this.levelScaleFactor = config.levelScaleFactor;
    this.maxTime = config.maxTime;
  }

  calculateHighScore(level: number, timeTaken: number): number {
    const clampedTime = Math.min(timeTaken, this.maxTime);

    // Ensure levelMultiplier is non-zero even for level 0
    const levelMultiplier =
      level === 0
        ? this.levelScaleFactor * 0.3 // Arbitrary base multiplier for level 0
        : Math.log10(level + 1) * this.levelScaleFactor;

    const timeMultiplier = Math.max(0.1, 1 - clampedTime / this.maxTime);

    return Math.floor(this.baseScore * levelMultiplier * timeMultiplier);
  }
  getNextLevelScore(currentLevel: number): number {
    const nextLevelMultiplier =
      Math.log10(currentLevel + 5) * this.levelScaleFactor;

    const maxTimeMultiplier = 1;

    return Math.floor(this.baseScore * nextLevelMultiplier * maxTimeMultiplier);
  }
}

export const highScore = new HighScore({
  baseScore: 100,
  levelScaleFactor: 50,
  maxTime: 5,
});
