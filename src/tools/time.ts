export const get_date = () => {
  const now = new Date();
  const date = now.getTime();
  return date;
};
export class Chronometer {
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private timerInterval: number | null = null;

  private timeToString(time: number): string {
    const diffInHrs = time / 3600000;
    const hh = Math.floor(diffInHrs);

    const diffInMin = (diffInHrs - hh) * 60;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    const diffInMs = (diffInSec - ss) * 1000;
    const ms = Math.floor(diffInMs);

    const formattedHH = hh.toString().padStart(2, "0");
    const formattedMM = mm.toString().padStart(2, "0");
    const formattedSS = ss.toString().padStart(2, "0");
    const formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
  }

  public start(): void {
    if (this.timerInterval !== null) {
      return;
    }
    this.startTime = Date.now() - this.elapsedTime;
    this.timerInterval = window.setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
    }, 10);
  }

  public stop(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  public reset(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
    }
    this.startTime = Date.now(); // Reset start time to current time
    this.elapsedTime = 0;
    this.start(); // Restart the timer
  }

  public getElapsedTime(): number {
    return this.elapsedTime;
  }

  public getFormattedElapsedTime(): string {
    return this.timeToString(this.elapsedTime);
  }
}
