import {useFieldArray} from "react-hook-form";
import {Box, Button, Typography} from "@mui/material";
import {ReactHookFormInput} from "../react-hook-forms/react-hook-form-input";
import React from "react";
import {ReactHookFormCheckbox} from "../react-hook-forms/react-hook-form-checkbox";

export const SingleQuestionComponent = ({index, control, remove}: any) => {
    const {append: appendAnswer, fields: answers} = useFieldArray({
        control,
        name: `questions_answers.${index}.answers`,
    });
    const renderSingleAnswer = (questionIndex: number, answerIndex: number) => {
        return (
            <Box border={'0.5px dotted black'} sx={{p: 2, mt: 1}}>
                <Typography sx={{mb: 1}}>Answer [#{answerIndex + 1}]</Typography>
                <ReactHookFormInput
                    name={`questions_answers[${questionIndex}].answers[${answerIndex}].text`}
                    control={control}
                    placeholder={'Text'}
                />
                <ReactHookFormCheckbox
                    name={`questions_answers[${questionIndex}].answers[${answerIndex}].is_true`}
                    label={'Is true'}
                    control={control}
                />
            </Box>
        )
    }
    const renderAnswers = (questionIndex: number) => {
        return (
            <>
                {answers?.map((answer, index) => renderSingleAnswer(questionIndex, index))}
            </>
        )
    }
    return (
        <Box border={'0.5px solid black'} borderRadius={'3px'} sx={{mt: 2, p: 2}}>
            <Typography variant={"h5"} sx={{mb: 1}}>Question [#{index + 1}]</Typography>
            <ReactHookFormInput
                name={`questions_answers[${index}].text`}
                control={control}
                placeholder={'Title'}/>
            <ReactHookFormInput
                name={`questions_answers[${index}].feedback_false`}
                control={control}
                placeholder={'Feedback False'}/>
            <ReactHookFormInput
                name={`questions_answers[${index}].feedback_true`}
                control={control}
                placeholder={'Feedback True'}/>
            {renderAnswers(index)}
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