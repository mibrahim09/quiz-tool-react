export interface QuizAnswersType {
    id: number;
    is_true: boolean;
    text: string;
}

export interface QuestionAnswersType {
    id: number;
    text: string;
    answer_id: number | null;
    answers: QuizAnswersType[];
    feedback_false: string;
    feedback_true: string;
}

