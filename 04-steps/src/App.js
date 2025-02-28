import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const buttonStyles = {
    backgroundColor: '#7950f2',
    color: '#fff'
  };
  const [isOpen, setIsOpen] = useState(true);

  const [step, setStep] = useState(1);

  const handleNextClick = () => {
    if (step < 3) setStep((s) => s + 1);
  }
  
  const handlePreviousClick = () => {
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen(is => !is)}
      >&times;</button>
      { isOpen && 
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step === 3 ? "active" : ""}`}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
          </StepMessage>

          <div className="buttons">
            <Button
              bgColor='#7950f2'
              textColor='#fff'
              onClick={handlePreviousClick}
            ><span>👈</span> Previous</Button>
            <Button
              bgColor='#7950f2'
              textColor='#fff'
              onClick={handleNextClick}
            >Next <span>👉</span></Button>
          </div>
        </div>
      }
    </>
  );
};

const StepMessage = ({step, children}) => {
  return (
    <p className="message">
      <h3>Step {step}</h3>
      { children }
    </p>
  );
}

const Button = ({textColor, bgColor, onClick, children}) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor}}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
