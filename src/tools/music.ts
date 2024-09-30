export enum GameSounds {
  CARD_ONE = "/memory_game/sounds/card-place-1.ogg",
  CARD_TWO = "/memory_game/sounds/card-place-4.ogg",
  GOOD = "/memory_game/sounds/jingles_NES09.ogg",
  BAD = "/memory_game/sounds/jingles_NES10.ogg",
  WIN = "/memory_game/sounds/jingles_NES03.ogg",
  SHUFFLE = "/memory_game/sounds/cards-pack-take-out-1.ogg",
}

export class Mixer {
  public static play = (soundKey: GameSounds | string) => {
    const audio = new Audio(soundKey);
    audio.play();
  };
}
