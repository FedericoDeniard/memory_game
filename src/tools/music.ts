import { Queue } from "./queue";

export enum GameSounds {
  CARD_ONE = "/memory_game/sounds/card-place-1.ogg",
  CARD_TWO = "/memory_game/sounds/card-place-4.ogg",
  GOOD = "/memory_game/sounds/jingles_NES09.ogg",
  BAD = "/memory_game/sounds/jingles_NES10.ogg",
  WIN = "/memory_game/sounds/jingles_NES03.ogg",
  SHUFFLE = "/memory_game/sounds/cards-pack-take-out-1.ogg",
}

export class Mixer {
  private static playing: HTMLAudioElement | null = null;
  private static playingQueue: HTMLAudioElement | null = null;
  private static queue = new Queue();

  /**
   * Plays a sound inmediatly
   * @param soundKey the sound to play
   */
  public static play = (soundKey: string) => {
    const audio = new Audio(soundKey);
    audio.play().then(() => (this.playing = audio));

    audio.addEventListener("ended", () => {
      this.playing = null;
    });
  };

  /**
   * Adds the sound into a queue and plays the queue
   * @param soundKey the sound to play
   */
  public static playNext = (soundKey: string) => {
    this.queue.enqueue(soundKey);
    if (this.playingQueue === null) {
      this.playNextInQueue();
    }
  };

  private static playFromQueue = (soundKey: string) => {
    const audio = new Audio(soundKey);
    this.playingQueue = audio;
    audio.play();

    audio.addEventListener("ended", () => {
      this.playingQueue = null;
      this.playNextInQueue();
    });
  };

  private static playNextInQueue = () => {
    if (!this.queue.isEmpty()) {
      const nextSound = this.queue.dequeue();
      this.playFromQueue(nextSound);
    }
  };

  public static isPlaying = () => {
    return this.playing !== null;
  };
}
