export default function Card({ name, url }) {
  return (
    <div>
      <img src={url} alt="ditto" width={100} height={100} />
      <p>{name}</p>
    </div>
  );
}
