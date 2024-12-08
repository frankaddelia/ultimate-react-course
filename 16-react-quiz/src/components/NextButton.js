import { DataStates } from '../enums/data-states';

function NextButton({ dispatch, answer }) {
  if (answer === null) return null;

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch(DataStates.NextQuestion)}
    >
      Next
    </button>
  );
}

export default NextButton;
