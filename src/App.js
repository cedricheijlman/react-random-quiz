import "./App.scss";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";

function App() {
  const { data, loading, error, refetch } = useFetch(
    `https://opentdb.com/api.php?amount=15`
  );

  const [gameState, setGameState] = useState({ currentQuestion: 0, points: 0 });
  const [animation, setAnimation] = useState(false);

  const restartGame = () => {
    setGameState({ currentQuestion: 0, points: 0 });
    refetch();
  };

  const addAnimation = () => {
    setAnimation(true);
  };

  const removeAnimation = () => {
    setTimeout(() => {
      setAnimation(false);
    }, 1700);
  };

  const handleClick = (e) => {
    if (e.target.value === data[gameState.currentQuestion]["answer"]) {
      setGameState({
        ...gameState,
        points: gameState.points + 1,
        currentQuestion: gameState.currentQuestion + 1,
      });
      addAnimation();
      removeAnimation();
    }

    if (e.target.value !== data[gameState.currentQuestion]["answer"]) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
      });
      addAnimation();
      removeAnimation();
    }
  };

  return (
    <div className="App">
      <div className="quiz">
        {gameState.currentQuestion < data.length && (
          <div className="quiz__upper">
            <h4 className={animation ? "animation" : ""}>
              Question {gameState.currentQuestion + 1}/{data && data.length} |
              Points: {data && gameState.points}
            </h4>
            <h2>
              {data.length !== 0 && data[gameState.currentQuestion].question}
            </h2>
          </div>
        )}
        <div className="quiz__lower">
          {gameState.currentQuestion == data.length && (
            <div className="quiz__end">
              <div>
                <h1>The Quick Quiz</h1>
                <p>Points: {gameState.points}</p>
              </div>
              <button onClick={restartGame}>New quiz</button>
            </div>
          )}
          {loading && (
            <img
              style={{ width: 50, height: 50 }}
              src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            />
          )}
          {data.length !== 0 &&
            gameState.currentQuestion < data.length &&
            data[gameState.currentQuestion].options.map((option) => {
              return (
                <button
                  value={option}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  key={Math.random() * 1000}
                >
                  {option}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
