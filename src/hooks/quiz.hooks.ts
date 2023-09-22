import {useCallback} from "react";
import {QuizType} from "../types/quiz.type";
import {useQuizContext} from "../context/quiz/quiz.context";

export const useQuizHooks = () => {
    const {quizList, setQuizList} = useQuizContext()
    const deleteQuiz = useCallback((id: number) => {
        const list = [...quizList];
        const index = list.findIndex((quiz) => quiz.id === id);
        if (index === -1) {
            return;
        }
        list.splice(index, 1);
        setQuizList(list)
    }, [quizList])

    const addQuiz = useCallback((quiz: QuizType) => {

    }, [quizList])
    return {deleteQuiz, addQuiz}
}
