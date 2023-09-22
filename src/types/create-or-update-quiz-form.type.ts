export interface CreateOrUpdateQuizAnswersFormType {
    id?: number;
    is_true?: boolean;
    text?: string;
}

export interface CreateOrUpdateQuestionAnswersFormType {
    id?: number;
    text?: string;
    answer_id?: number | null;
    answers?: CreateOrUpdateQuizAnswersFormType[];
    feedback_false?: string;
    feedback_true?: string;
}

export interface CreateOrUpdateFormQuizType {
    description?: string;
    questions_answers?: CreateOrUpdateQuestionAnswersFormType[];
    score?: number | null;
    title?: string;
    url?: string;
}