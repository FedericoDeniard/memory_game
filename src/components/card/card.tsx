import './card.css'

type CardImage = string
export const Card = ({image} : {image: CardImage}) => {
return (
    <>
    <div className="card">
    <img className='card-image' src={image}/>
    
    </div>
    </>
)
}