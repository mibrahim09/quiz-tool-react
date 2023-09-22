import {QuizProvider} from "../../context/quiz/quiz.provider";
import {ListQuizPageContainer} from "../../containers/quiz-page/list-quiz.container";

export const ListQuizPage = () => {

    return (
        <QuizProvider>
            <ListQuizPageContainer/>
        </QuizProvider>
    )
}