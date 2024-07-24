import { Card } from "../card/card";
import "./board.css";
import { fisherYatesShuffle } from "../sorts/sorts";
import { useEffect, useState } from "react";

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
            : "assets/icons/question_mark.png"
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
