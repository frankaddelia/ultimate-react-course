import { DataStates } from '../enums/data-states';

function StartScreet({ numQuestions, dispatch }) {
  return (
    <div className='start'>
      <h2>Welcome To the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch(DataStates.Started)}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreet;
