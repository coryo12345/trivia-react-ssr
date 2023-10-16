interface QuestionObj {
  text: string;
}

export interface TriviaQuestion {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: QuestionObj;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
  isNiche: boolean;
}

export type QuestionResponse = TriviaQuestion[];
