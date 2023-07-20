import { useMutation, useQuery } from "react-query";
import { apiRoutes } from "../routes";
import { Question, QuizResult } from "../types/quiz";
import { axiosInst } from "./axios";

interface QuizQuestionsResponse {
  questions: Question[];
}

export const useQuizQuestions = (exhibitId: string) => {
  return useQuery({
    queryKey: ["quiz-questions", exhibitId],
    queryFn: () =>
      axiosInst
        .get<QuizQuestionsResponse>(apiRoutes.QUIZ)
        .then((res) => res.data)
  });
};

export const useSubmitQuiz = (osid: any) => {
  return useMutation({
    mutationKey: ["quiz-submit", osid],
    mutationFn: (quizData: any) =>
      axiosInst
        .post<QuizResult>(`${apiRoutes.QUIZ_SUBMIT}/${osid}`, 
        {
          "answers": quizData
        })
        .then((res) => {console.log('on quiz submit ', res); return res.data})
  });
};
