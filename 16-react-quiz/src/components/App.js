import { useEffect, useReducer } from 'react';

import Error from './Error';
import Header from './Header';
import Loader from './Loader';
import Main from './Main';
import NextButton from './NextButton';
import Question from './Question';
import StartScreet from './StartScreet';

import { DataStates } from '../enums/data-states';
import { QuizStates } from '../enums/quiz-states';

const initialState = {
  questions: [],
  status: QuizStates.Loading,
  questionIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case DataStates.Received:
      return { ...state, questions: action.payload, status: QuizStates.Ready };
    case DataStates.Failed:
      return { ...state, status: QuizStates.Error };
    case DataStates.Started:
      return { ...state, status: QuizStates.Active };
    case DataStates.Answered:
      const question = state.questions.at(state.questionIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case DataStates.NextQuestion:
      return { ...state, questionIndex: state.questionIndex + 1, answer: null };
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ answer, questions, questionIndex, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const callDispatch = (type, payload = null) => {
    dispatch({ type, payload });
  };

  const numQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => callDispatch(DataStates.Received, data))
      .catch((err) => callDispatch(DataStates.Failed));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === QuizStates.Loading && <Loader />}
        {status === QuizStates.Error && <Error />}
        {status === QuizStates.Ready && (
          <StartScreet numQuestions={numQuestions} dispatch={callDispatch} />
        )}
        {status === QuizStates.Active && (
          <>
            <Question
              question={questions[questionIndex]}
              answer={answer}
              dispatch={callDispatch}
            />
            <NextButton dispatch={callDispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
