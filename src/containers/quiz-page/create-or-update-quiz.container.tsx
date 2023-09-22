import {Box, Button, Typography} from "@mui/material";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useQuizHooks} from "../../hooks/quiz.hooks";
import {CreateOrUpdateFormQuizType} from "../../types/create-or-update-quiz-form.type";
import {ReactHookFormInput} from "../../components/react-hook-forms/react-hook-form-input";
import {SingleQuestionComponent} from "../../components/quiz-form/single-question.component";

interface CreateOrUpdateQuizFormProps {
    id?: number;
}

export const CreateOrUpdateQuizForm = ({id}: CreateOrUpdateQuizFormProps) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<CreateOrUpdateFormQuizType>({
        defaultValues: {
            description: '',
            questions_answers: [],
            score: null,
            title: '',
            url: ''
        }
    })

    const {
        fields: questionsArray,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "questions_answers"
    });

    const isEditing = !!id
    const {fetchQuizInfo, addQuiz, updateQuiz} = useQuizHooks()

    useEffect(() => {
        if (id) {
            const data = fetchQuizInfo(id);
            reset(data);
            return;
        }
        reset()
    }, [id]);

    const onSubmit: SubmitHandler<CreateOrUpdateFormQuizType> = (data) => {
        if (!isEditing) {
            addQuiz(data)
        } else {
            // usually i'd get the dirty data first and then edit but in  our case it doesnt really go the backend here since its mocked
            // so i'll just go on with the faster approach.
            updateQuiz(id, data);
        }
    }
    const renderQuestions = () => {
        return (
            <>
                {
                    questionsArray.map((question, index) => {
                        return (
                            <SingleQuestionComponent
                                index={index}
                                control={control}
                                remove={remove}
                            />
                        )
                    })
                }
            </>
        )
    }
    const renderControls = () => {
        return (<Box sx={{mt: 3, mb: 3}}>
                <Button variant={"outlined"} color={"success"} sx={{mr: 1}} onClick={() => append({})}>Add
                    question</Button>
                <Button type={"submit"} variant={"outlined"}>{isEditing ? "Update Quiz" : "Create Quiz"}</Button>
            </Box>
        )
    }

    return (
        <>
            <Box sx={{mb: 2}}>
                {isEditing && <Typography variant={"h5"}>Edit existing quiz </Typography>}
                {!isEditing && <Typography variant={"h5"}>Create new quiz.</Typography>}
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>

                <ReactHookFormInput
                    name={`title`}
                    control={control}
                    placeholder={'Title'}
                />
                <ReactHookFormInput
                    name={`description`}
                    control={control}
                    placeholder={'Description'}
                />
                <ReactHookFormInput
                    name={`url`}
                    control={control}
                    placeholder={'Youtube Url'}
                />
                <ReactHookFormInput
                    name={`score`}
                    control={control}
                    placeholder={'Score'}
                    type={"number"}
                />
                {renderQuestions()}
                {renderControls()}
            </form>
        </>
    )
}