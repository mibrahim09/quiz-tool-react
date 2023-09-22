import {QuestionAnswersType} from "./question-answers.type";

export interface QuizType {
    id: number;
    created: string;
    modified: string;
    description: string;
    questions_answers: QuestionAnswersType[];
    score: number | null;
    title: string;
    url: string;
}