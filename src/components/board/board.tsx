import { Card } from "../card/card";
import './board.css'
import { fisherYatesShuffle } from "../sorts/sorts";

const sortCards = (cardAmount: number) => {
    const images = ['src/assets/animals/bear.png', 'src/assets/animals/buffalo.png', 'src/assets/animals/chick.png', 'src/assets/animals/chicken.png', 'src/assets/animals/cow.png', 'src/assets/animals/crocodile.png', 'src/assets/animals/dog.png', 'src/assets/animals/duck.png', 'src/assets/animals/elephant.png', 'src/assets/animals/frog.png', 'src/assets/animals/giraffe.png', 'src/assets/animals/goat.png', 'src/assets/animals/gorilla.png', 'src/assets/animals/hippo.png', 'src/assets/animals/horse.png', 'src/assets/animals/monkey.png', 'src/assets/animals/moose.png', 'src/assets/animals/narwhal.png', 'src/assets/animals/owl.png', 'src/assets/animals/panda.png', 'src/assets/animals/parrot.png', 'src/assets/animals/penguin.png', 'src/assets/animals/pig.png', 'src/assets/animals/rabbit.png', 'src/assets/animals/rhino.png', 'src/assets/animals/sloth.png', 'src/assets/animals/snake.png', 'src/assets/animals/walrus.png', 'src/assets/animals/whale.png', 'src/assets/animals/zebra.png' ]
    
    let selectedCards: string[] = []

        let selectedNumbers: number[] = []

        for (let i = 0; i < (cardAmount); i++) {
            let randomNumber = Math.floor(Math.random() * images.length)
            while (selectedNumbers.includes(randomNumber)) {
                randomNumber = Math.floor(Math.random() * images.length)
            }
            selectedNumbers.push(randomNumber)
            selectedCards.push(images[randomNumber])
            selectedCards.push(images[randomNumber])
        }

    fisherYatesShuffle(selectedCards)
    return selectedCards 
    }

export const Board = () => {


    let selectedCards = sortCards(8)
    const gridStyle = {
        gridTemplateColumns: `repeat(${(selectedCards.length / 2) % 2 === 0 ? 4 : 3}, minmax(150px, 1fr))`
    }

        return (
        <>
        <div className='board' style={gridStyle}>
        {selectedCards.map((image, index) => (
    <Card key={index} image={image} />
))}

        </div>
        </>
    )
}

