export interface Question {
  osid: string;
  question: string;
  options: string[];
}

export interface QuizResult {
  badgeWon: boolean,
  message: string
}