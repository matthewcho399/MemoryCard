export default function Scoreboard({ currentScore, highScore }) {
  return (
    <div>
      <p>current score: {currentScore}</p>
      <p>high score: {highScore}</p>
    </div>
  );
}
