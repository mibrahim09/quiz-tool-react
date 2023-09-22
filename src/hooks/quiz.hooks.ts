import {useCallback} from "react";
import {QuizType} from "../types/quiz.type";
import {useQuizContext} from "../context/quiz/quiz.context";
import {CreateOrUpdateFormQuizType} from "../types/create-or-update-quiz-form.type";
import {QUIZ_LIST} from "../quiz-list-constants";
import {randomIntFromInterval} from "../utils/utils";

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

    const addQuiz = useCallback((quiz: CreateOrUpdateFormQuizType) => {
        const date = Date.now().toString()

        // This part is not supposed to happen in the frontend but we are mocking it here.
        quiz?.questions_answers?.forEach((q) => {
            q.id = randomIntFromInterval(1, 1000)
            q?.answers?.forEach((answer) => answer.id = randomIntFromInterval(1, 1000))
        })

        QUIZ_LIST.push(<QuizType>{
            created: date,
            id: randomIntFromInterval(30, 5000),
            modified: date,
            ...quiz
        })
        setQuizList([...QUIZ_LIST])
    }, [quizList])

    const fetchQuizInfo = useCallback((id: number): QuizType | undefined => {
        const index = quizList.findIndex((quiz) => quiz.id === id);
        if (index === -1) {
            return undefined
        }
        return quizList.at(index);

    }, [quizList])

    const updateQuiz = useCallback((id: number, quizData: CreateOrUpdateFormQuizType) => {
        const index = quizList.findIndex((quiz) => quiz.id === id);
        if (index === -1) {
            return
        }
        const quiz = quizList.at(index);
        quizList[index] = <QuizType>{...quiz, ...quizData}
        setQuizList([...quizList])
    }, []);

    return {
        deleteQuiz,
        addQuiz,
        fetchQuizInfo,
        updateQuiz
    }
}
