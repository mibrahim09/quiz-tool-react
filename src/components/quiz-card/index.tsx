import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useQuizHooks} from "../../hooks/quiz.hooks";
import {useQuizContext} from "../../context/quiz/quiz.context";

interface Props {
    id: number;
    title: string;
    description: string;
}

export const QuizCard = ({id, title, description}: Props) => {
    const {deleteQuiz} = useQuizHooks()
    const {setQuizFormId, setShowQuizForm} = useQuizContext()
    const editQuiz = () => {
        setQuizFormId(id)
        setShowQuizForm(true)
    };
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={editQuiz}>Edit</Button>
                <Button size="small" onClick={() => deleteQuiz(id)}>Delete</Button>
            </CardActions>
        </Card>)
};