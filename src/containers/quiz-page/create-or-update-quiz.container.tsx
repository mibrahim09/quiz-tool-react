import {Box, Button, Checkbox, FormControlLabel, OutlinedInput, Typography} from "@mui/material";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {useQuizHooks} from "../../hooks/quiz.hooks";
import {CreateOrUpdateFormQuizType} from "../../types/create-or-update-quiz-form.type";

interface CreateOrUpdateQuizFormProps {
    id?: number;
}

export const CreateOrUpdateQuizForm = ({id}: CreateOrUpdateQuizFormProps) => {
    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        getValues,
        setValue
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
        console.log(data)


    }
    const renderInput = ({name, ...extraProps}: { name: any; [key: string]: any }) => {
        return (
            <Box sx={{mb: 1}}>
                <Controller
                    name={name}
                    control={control}
                    render={({field}) => <OutlinedInput
                        {...extraProps}
                        fullWidth {...field} />}
                />
            </Box>
        )
    }
    const renderCheckbox = ({name, label}: { name: any; label: string; [key: string]: any }) => {
        return (
            <Box sx={{mb: 1}}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={false} // Set the default value
                    render={({field}) =>
                        <FormControlLabel control={<Checkbox checked={field.value}/>} label={label}/>}
                />
            </Box>
        )
    }
    const renderSingleAnswer = (questionIndex: number, answerIndex: number) => {
        return (
            <Box border={'0.5px dotted black'} sx={{p: 2, mt: 1}}>
                <Typography sx={{mb: 1}}>Answer [#{answerIndex + 1}]</Typography>
                {renderInput({
                    name: `questions_answers[${questionIndex}].answers[${answerIndex}].text`,
                    placeholder: "Text"
                })}
                {renderCheckbox({
                    name: `questions_answers[${questionIndex}].answers[${answerIndex}].is_true`,
                    label: "Is true",
                })}
            </Box>
        )
    }
    const renderAnswers = (questionIndex: number) => {
        const answers = getValues(`questions_answers.${questionIndex}.answers`)
        return (
            <>
                {answers?.map((answer, index) => renderSingleAnswer(questionIndex, index))}
            </>
        )
    }
    const renderSingleQuestion = (index: number) => {
        const {append: appendAnswer, fields: questions} = useFieldArray({
            control,
            name: `questions_answers.${index}.answers`,
        });
        return (
            <Box border={'0.5px solid black'} borderRadius={'3px'} sx={{mt: 2, p: 2}}>
                <Typography variant={"h5"} sx={{mb: 1}}>Question [#{index + 1}]</Typography>
                {renderInput({name: `questions_answers[${index}].text`, placeholder: "Title"})}
                {renderInput({
                    name: `questions_answers[${index}].feedback_false`,
                    placeholder: "Feedback False"
                })}
                {renderInput({
                    name: `questions_answers[${index}].feedback_true`,
                    placeholder: "Feedback True"
                })}
                {
                    renderAnswers(index)
                }
                <Button variant={"contained"} color={'error'} sx={{mt: 1}}
                        onClick={() => remove(index)}>Remove
                    question</Button>
                <Button variant={"contained"} color={'primary'} sx={{mt: 1, ml: 1}}
                        onClick={() => {
                            appendAnswer({})
                        }}> Add Answer</Button>

            </Box>
        )
    }
    const renderQuestions = () => {
        return (
            <>
                {
                    questionsArray.map((question, index) => {
                        renderSingleQuestion(index)
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
                {renderInput({name: "title", placeholder: "Title"})}
                {renderInput({name: "description", placeholder: "Description"})}
                {renderInput({name: "url", placeholder: "Youtube Url"})}
                {renderInput({name: "score", placeholder: "Score", type: "number"})}
                {renderQuestions()}
                {renderControls()}
            </form>
        </>
    )
}