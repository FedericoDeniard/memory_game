import "./card.css";

type CardImage = string;
type CardProps = {
  image: CardImage;
  onClick: () => void;
};
export const Card = ({ image, onClick }: CardProps) => {
  return (
    <>
      <div className="card" onClick={onClick}>
        <img className="card-image" src={image} />
      </div>
    </>
  );
};
