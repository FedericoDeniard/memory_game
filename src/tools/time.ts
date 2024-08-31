

export const get_date = () => {
    let now = new Date();
    let date = now.getTime();
    return date
}
export class Chronometer {
    private startTime: number = 0;
    private elapsedTime: number = 0;
    private timerInterval: number | null = null;

    private timeToString(time: number): string {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 1000;
        let ms = Math.floor(diffInMs);

        let formattedHH = hh.toString().padStart(2, "0");
        let formattedMM = mm.toString().padStart(2, "0");
        let formattedSS = ss.toString().padStart(2, "0");
        let formattedMS = ms.toString().padStart(3, "0");

        return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
    }

    public start(): void {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = window.setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
        }, 10);
    }

    public stop(): void {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
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
