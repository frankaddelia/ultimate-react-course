import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

const Actions = {
  Dec: 'dec',
  Inc: 'inc',
  SetCount: 'setCount',
  SetStep: 'setStep',
  Reset: 'reset',
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.Dec:
      return { ...state, count: state.count - state.step };
    case Actions.Inc:
      return { ...state, count: state.count + state.step };
    case Actions.SetCount:
      return { ...state, count: action.payload };
    case Actions.SetStep:
      return { ...state, step: action.payload };
    case Actions.Reset:
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  const callDispatch = (type, payload = null) => {
    dispatch({ type, payload });
  };

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    callDispatch(Actions.Dec, step);
  };

  const inc = function () {
    callDispatch(Actions.Inc, step);
  };

  const defineCount = function (e) {
    callDispatch(Actions.SetCount, Number(e.target.value));
  };

  const defineStep = function (e) {
    callDispatch(Actions.SetStep, Number(e.target.value));
  };

  const reset = function () {
    callDispatch(Actions.Reset);
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
