import {QuizContext} from "./quiz.context";
import {useCallback, useEffect, useState} from "react";
import {QuizType} from "../../types/quiz.type";

export const QuizProvider = ({children}: { children: any }) => {
    const [quizList, setQuizList] = useState<QuizType[]>([]);
    const [quizFormId, setQuizFormId] = useState<undefined | number>()
    const [showQuizForm, setShowQuizForm] = useState(false);
    return (
        <QuizContext.Provider value={{
            quizList,
            setQuizList,
            quizFormId,
            setQuizFormId,
            showQuizForm,
            setShowQuizForm
        }}>
            {children}
        </QuizContext.Provider>
    );
};