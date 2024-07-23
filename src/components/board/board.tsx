import { Card } from "../card/card";
import "./board.css";
import { fisherYatesShuffle } from "../sorts/sorts";
import { useEffect, useState } from "react";

const sortCards = (cardAmount: number) => {
  const images = [
    "src/assets/animals/bear.png",
    "src/assets/animals/buffalo.png",
    "src/assets/animals/chick.png",
    "src/assets/animals/chicken.png",
    "src/assets/animals/cow.png",
    "src/assets/animals/crocodile.png",
    "src/assets/animals/dog.png",
    "src/assets/animals/duck.png",
    "src/assets/animals/elephant.png",
    "src/assets/animals/frog.png",
    "src/assets/animals/giraffe.png",
    "src/assets/animals/goat.png",
    "src/assets/animals/gorilla.png",
    "src/assets/animals/hippo.png",
    "src/assets/animals/horse.png",
    "src/assets/animals/monkey.png",
    "src/assets/animals/moose.png",
    "src/assets/animals/narwhal.png",
    "src/assets/animals/owl.png",
    "src/assets/animals/panda.png",
    "src/assets/animals/parrot.png",
    "src/assets/animals/penguin.png",
    "src/assets/animals/pig.png",
    "src/assets/animals/rabbit.png",
    "src/assets/animals/rhino.png",
    "src/assets/animals/sloth.png",
    "src/assets/animals/snake.png",
    "src/assets/animals/walrus.png",
    "src/assets/animals/whale.png",
    "src/assets/animals/zebra.png",
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

export const Board = ({ cardAmount }: { cardAmount: number }) => {
  const [cards, setCards] = useState(sortCards(cardAmount));
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [guessedCards, setGuessedCards] = useState<number[]>([]);

  const gridStyle = {
    gridTemplateColumns: `repeat(${
      (cards.length / 2) % 2 === 0 ? 4 : 3
    }, minmax(150px, 1fr))`,
  };

  const handleCardClick = (index: number) => {
    if (
      clickedCards.length < 2 &&
      !clickedCards.includes(index) &&
      !guessedCards.includes(index)
    ) {
      const newClickedCards = [...clickedCards, index];
      setClickedCards(newClickedCards);

      if (newClickedCards.length === 2) {
        if (cards[newClickedCards[0]] === cards[newClickedCards[1]]) {
          setGuessedCards([...guessedCards, ...newClickedCards]);
        }
        setTimeout(() => {
          setClickedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(sortCards(cardAmount));
    setClickedCards([]);
    setGuessedCards([]);
  };

  useEffect(() => {
    if (guessedCards.length === cards.length) {
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  });
  const showCards = (cards: string[]) => {
    return cards.map((image, index) => (
      <Card
        key={index}
        image={
          guessedCards.includes(index) || clickedCards.includes(index)
            ? image
            : "src/assets/icons/question_mark.png"
        }
        onClick={() => handleCardClick(index)}
      />
    ));
  };

  return (
    <>
      <div className="board" style={gridStyle}>
        {showCards(cards)}
      </div>
    </>
  );
};
