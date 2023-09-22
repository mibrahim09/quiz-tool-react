import React, {useEffect} from "react";
import {QUIZ_LIST} from "../../quiz-list-constants";
import {Box, Button, Grid, Typography} from "@mui/material";
import {QuizCard} from "../../components/quiz-card";
import {useQuizContext} from "../../context/quiz/quiz.context";
import {QuizType} from "../../types/quiz.type";
import {CreateOrUpdateQuizForm} from "./create-or-update-quiz.container";

export const ListQuizPageContainer = () => {
    const {quizList, setQuizList, showQuizForm, setShowQuizForm, setQuizFormId, quizFormId} = useQuizContext();
    useEffect(() => {
    }, [quizList])

    // Setting the initial list.
    useEffect(() => {
        setQuizList(QUIZ_LIST);
    }, []);

    const renderButtons = () => {
        const createNewQuiz = () => {
            setQuizFormId(undefined);
            setShowQuizForm(true);
        }
        return (
            <Button variant={'contained'} sx={{mb: 3}} onClick={createNewQuiz}>Create new quiz</Button>
        )
    }
    const renderQuizzes = () => {
        return (
            <>
                {!quizList || quizList?.length === 0 && <Typography>No quizzes found. Maybe create one?</Typography>}
                <Grid container spacing={2} sx={{mb: 3}}>
                    {quizList?.map((quiz: QuizType) =>
                        <Grid item lg={3} md={6} key={quiz.id}>
                            <QuizCard id={quiz.id} title={quiz.title} description={quiz.description}/>
                        </Grid>
                    )}
                </Grid>
            </>
        )
    }

    return (
        <Box>
            <Typography variant={"h5"} sx={{mb: 3}}>Quiz list</Typography>
            {renderButtons()}
            {renderQuizzes()}

            {showQuizForm && <CreateOrUpdateQuizForm id={quizFormId}/>}
        </Box>
    )
}