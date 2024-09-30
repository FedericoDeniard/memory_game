import useSound from "use-sound";

import cardSoundOne from "../sounds/card-place-1.ogg";
import cardSoundTwo from "../sounds/card-place-4.ogg";
import goodSound from "../sounds/jingles_NES09.ogg";
import badSound from "../sounds/jingles_NES10.ogg";
import winSound from "../sounds/jingles_NES03.ogg";
import shuffleCards from "../sounds/cards-pack-take-out-1.ogg";

export enum Sounds {
  CARD_ONE = "cardOne",
  CARD_TWO = "cardTwo",
  GOOD = "good",
  BAD = "bad",
  WIN = "win",
  SHUFFLE = "shuffle",
}

// Hook personalizado para manejar sonidos
export function useMixer() {
  const [playCardOne] = useSound(cardSoundOne);
  const [playCardTwo] = useSound(cardSoundTwo);
  const [playGood] = useSound(goodSound);
  const [playBad] = useSound(badSound);
  const [playWin] = useSound(winSound);
  const [playShuffle] = useSound(shuffleCards);

  const play = (soundKey: Sounds) => {
    switch (soundKey) {
      case Sounds.CARD_ONE:
        playCardOne();
        break;
      case Sounds.CARD_TWO:
        playCardTwo();
        break;
      case Sounds.GOOD:
        playGood();
        break;
      case Sounds.BAD:
        playBad();
        break;
      case Sounds.WIN:
        playWin();
        break;
      case Sounds.SHUFFLE:
        playShuffle();
        break;
      default:
        console.warn("Sonido no encontrado");
    }
  };

  return play;
}
