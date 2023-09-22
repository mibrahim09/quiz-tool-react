import {QuizType} from "../../types/quiz.type";
import {SetStateAction} from "react";

interface QuizContextDefaultProps {
    quizList: QuizType[];
    setQuizList: (newQuizTypes: SetStateAction<QuizType[]>) => void;
    quizFormId: number | undefined;
    setQuizFormId: (newFormId: SetStateAction<number | undefined>) => void;
    showQuizForm: boolean;
    setShowQuizForm: (showQuiz: SetStateAction<boolean>) => void;
}

export const QuizContextDefaultValues: QuizContextDefaultProps = {
    quizList: [],
    setQuizList: (newQuizTypes: SetStateAction<QuizType[]>) => {
    },
    quizFormId: undefined,
    setQuizFormId: (newFormId: SetStateAction<number | undefined>) => {
    },
    showQuizForm: false,
    setShowQuizForm: (showQuiz: SetStateAction<boolean>) => {
    }
}
