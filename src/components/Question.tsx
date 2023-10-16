import { useMemo, useState } from "react";
import type { TriviaQuestion } from "../models/trivia";
import { QuestionState } from "../models/question";
import { Check, X } from "lucide-react";

interface Props {
  question: TriviaQuestion;
}

export function Question({ question }: Props) {
  const [guess, setGuess] = useState<string | null>(null);

  const questionState: QuestionState = useMemo(() => {
    if (guess === null) return QuestionState.NOT_ANSWERED;
    else if (guess === question.correctAnswer) return QuestionState.CORRECT;
    else return QuestionState.INCORRECT;
  }, [guess]);

  const answers = useMemo(() => {
    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    for (let i = 0; i < 5; i++) {
      answers.sort(() => 0.5 - Math.random());
    }
    return answers;
  }, [question]);

  const handleClick = (userGuess: string) => {
    if (guess !== null) return;
    setGuess(userGuess);
  };

  return (
    <section className="bg-slate-50 rounded my-2 mx-auto w-fit px-4 py-2">
      <h2 className="text-lg">{question.question.text}</h2>
      {questionState === QuestionState.NOT_ANSWERED && (
        <ul>
          {answers.map((answer) => (
            <li key={answer}>
              <button
                className="text-md rounded cursor-pointer hover:bg-gray-300 w-full"
                onClick={() => handleClick(answer)}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      )}
      {questionState === QuestionState.CORRECT && (
        <>
          <span className="flex text-green-700 justify-center items-center">
            <Check />
            <p>Correct!</p>
          </span>
          <p className="text-green-700">{question.correctAnswer}</p>
        </>
      )}
      {questionState === QuestionState.INCORRECT && (
        <>
          <span className="flex text-red-700 justify-center items-center">
            <X />
            <p>Incorrect.</p>
          </span>
          <p>You Guessed: <span className="text-red-700">{guess}</span></p>
          <p>Correct Answer: {question.correctAnswer}</p>
        </>
      )}
    </section>
  );
}

export default Question;
