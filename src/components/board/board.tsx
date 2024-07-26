import { Card } from "../card/card";
import "./board.css";
import { fisherYatesShuffle } from "../sorts/sorts";
import { useEffect, useState, useRef } from "react";

import useSound from "use-sound";
import cardSoundOne from "../../sounds/card-place-1.ogg";
import cardSoundTwo from "../../sounds/card-place-4.ogg";
import goodSound from "../../sounds/jingles_NES09.ogg";
import badSound from "../../sounds/jingles_NES10.ogg";
import winSound from "../../sounds/jingles_NES03.ogg";
import shuffleCards from "../../sounds/cards-pack-take-out-1.ogg";

import { get_scores, save_score, Score } from "../../tools/fetch";
import { get_date, Chronometer } from "../../tools/time";

const sortCards = (cardAmount: number) => {
  const images = [
    "assets/animals/bear.png",
    "assets/animals/buffalo.png",
    "assets/animals/chick.png",
    "assets/animals/chicken.png",
    "assets/animals/cow.png",
    "assets/animals/crocodile.png",
    "assets/animals/dog.png",
    "assets/animals/duck.png",
    "assets/animals/elephant.png",
    "assets/animals/frog.png",
    "assets/animals/giraffe.png",
    "assets/animals/goat.png",
    "assets/animals/gorilla.png",
    "assets/animals/hippo.png",
    "assets/animals/horse.png",
    "assets/animals/monkey.png",
    "assets/animals/moose.png",
    "assets/animals/narwhal.png",
    "assets/animals/owl.png",
    "assets/animals/panda.png",
    "assets/animals/parrot.png",
    "assets/animals/penguin.png",
    "assets/animals/pig.png",
    "assets/animals/rabbit.png",
    "assets/animals/rhino.png",
    "assets/animals/sloth.png",
    "assets/animals/snake.png",
    "assets/animals/walrus.png",
    "assets/animals/whale.png",
    "assets/animals/zebra.png",
  ];

  let selectedCards: string[] = [];
  let selectedNumbers: number[] = [];

  for (let i = 0; i < cardAmount; i++) {
    let randomNumber = Math.floor(Math.random() * images.length);
    while (selectedNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * images.length);
    }
    selectedNumbers.push(randomNumber);
    selectedCards.push(images[randomNumber]);
    selectedCards.push(images[randomNumber]);
  }
  fisherYatesShuffle(selectedCards);

  return selectedCards;
};

export const Board = ({
  cardAmount,
  usernameProp,
  uuidProp,
  updateScores,
}: {
  cardAmount: number;
  usernameProp: string;
  uuidProp: string;
  updateScores: () => void;
}) => {
  const username = usernameProp;
  const uuid = uuidProp;

  const chronometerRef = useRef<Chronometer | null>(null);
  const [cards, setCards] = useState(sortCards(cardAmount));
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [guessedCards, setGuessedCards] = useState<number[]>([]);

  const [playSoundCardOne] = useSound(cardSoundOne);
  const [playSoundCardTwo] = useSound(cardSoundTwo);
  const [playGoodSound] = useSound(goodSound);
  const [playBadSound] = useSound(badSound);
  const [playWinSound] = useSound(winSound);
  const [playShuffleSound] = useSound(shuffleCards);

  const startChronometer = () => {
    if (!chronometerRef.current) {
      chronometerRef.current = new Chronometer();
    }
    chronometerRef.current.start();
  };

  const stopChronometer = () => {
    chronometerRef.current?.stop();
  };

  const resetChronometer = () => {
    chronometerRef.current?.reset();
  };

  const getElapsedTime = () => {
    return chronometerRef.current?.getElapsedTime() || 0;
  };

  const resetGame = () => {
    stopChronometer();
    const elapsedTime = getElapsedTime();
    const now = get_date();
    const last_record: Score = {
      id: uuid,
      username: username,
      time: elapsedTime,
      date: now,
    };

    get_scores("https://api-memory-game.onrender.com/leaderboard").then(
      (data) => {
        const uuidExists = data.findIndex((score) => score.id === uuid);
        if (uuidExists === -1 || data[uuidExists].time > elapsedTime) {
          save_score(
            "https://api-memory-game.onrender.com/leaderboard/new_record",
            last_record
          )
            .then(() => {
              updateScores();
            })
            .catch((error) => {
              console.error("Error saving score:", error);
            });
        }
      }
    );

    setCards(sortCards(cardAmount));
    setClickedCards([]);
    setGuessedCards([]);
    playShuffleSound();
    console.log(last_record);

    resetChronometer();
    startChronometer();
  };

  useEffect(() => {
    startChronometer();
    return () => {
      stopChronometer();
    };
  }, []);

  useEffect(() => {
    if (guessedCards.length === cards.length) {
      const soundTimer = setTimeout(() => {
        playWinSound();
      }, 500);

      const resetTimer = setTimeout(() => {
        resetGame();
      }, 3000);

      return () => {
        clearTimeout(soundTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [guessedCards, cards]);

  const showCards = (cards: string[]) => {
    return cards.map((image, index) => (
      <Card
        key={index}
        image={
          guessedCards.includes(index) || clickedCards.includes(index)
            ? image
            : "assets/icons/question_mark.png"
        }
        onClick={() => {
          handleCardClick(index);
        }}
      />
    ));
  };

  const handleCardClick = (index: number) => {
    if (
      clickedCards.length < 2 &&
      !clickedCards.includes(index) &&
      !guessedCards.includes(index)
    ) {
      const newClickedCards = [...clickedCards, index];
      setClickedCards(newClickedCards);
      playSoundCardOne();
      if (newClickedCards.length === 2) {
        if (cards[newClickedCards[0]] === cards[newClickedCards[1]]) {
          setGuessedCards([...guessedCards, ...newClickedCards]);
          playGoodSound();
        } else {
          playBadSound();
        }
        setTimeout(() => {
          setClickedCards([]);
          if (cards[newClickedCards[0]] !== cards[newClickedCards[1]]) {
            playSoundCardTwo();
          }
        }, 1000);
      }
    }
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${
      (cards.length / 2) % 2 === 0 ? 4 : 3
    }, minmax(150px, 1fr))`,
  };

  return (
    <>
      <div className="board" style={gridStyle}>
        {showCards(cards)}
      </div>
    </>
  );
};
