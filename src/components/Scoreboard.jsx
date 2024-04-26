export default function Scoreboard({ currentScore, highScore }) {
  return (
    <div>
      <p>Current Score: {currentScore}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}
