import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Counter />
    </div>
  );
}

function Counter() {
  const getDate = (count) => {
    const tempdate = new Date();
    tempdate.setDate(tempdate.getDate() + (count > 0 ? count : 0));

    return tempdate;
  }

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  let date = getDate(count);
  
  const handleResetClick = () => {
    setCount(0);
    setStep(1);
    date = getDate(count);
  }

  return (
    <div>
      <div>
        <input
          type="range" min="0" max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      <p>
        <button onClick={handleResetClick} disabled={step === 1 && count === 0}>Reset</button>
      </p>
    </div>
  );
}
