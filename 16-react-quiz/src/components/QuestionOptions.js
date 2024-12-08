import { DataStates } from '../enums/data-states';

function QuestionOptions({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            onClick={() => dispatch(DataStates.Answered, index)}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionOptions;
