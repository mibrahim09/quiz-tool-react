import {createContext, useContext} from 'react';
import {QuizContextDefaultValues} from "./quiz-context-default-values";

export const QuizContext = createContext(QuizContextDefaultValues);

export const useQuizContext = () => {
    return useContext(QuizContext);
};