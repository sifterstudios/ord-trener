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
    const levelMultiplier = Math.pow(1.5, level + 1) * this.levelScaleFactor;
    const timeMultiplier = Math.max(0.1, 1 - clampedTime / this.maxTime);

    console.log(
      "HighScore.calculateHighScore",
      this.baseScore,
      levelMultiplier,
      timeMultiplier,
    );
    return Math.floor((this.baseScore * levelMultiplier) / timeMultiplier);
  }
  getNextLevelScore(currentLevel: number): number {
    const nextLevelMultiplier =
      Math.pow(2.5, currentLevel + 1) * this.levelScaleFactor;

    const maxTimeMultiplier = 1;

    return Math.floor(this.baseScore * nextLevelMultiplier * maxTimeMultiplier);
  }
}

export const highScore = new HighScore({
  baseScore: 78,
  levelScaleFactor: 30,
  maxTime: 500,
});
