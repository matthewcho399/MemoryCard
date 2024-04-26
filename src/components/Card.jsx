import "../styles/card.css";

export default function Card({ name, url }) {
  return (
    <div className="card-container">
      <img src={url} alt="ditto" width={230} height={230} />
      <hr></hr>
      <p className="name">{name}</p>
    </div>
  );
}
