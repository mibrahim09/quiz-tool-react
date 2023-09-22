import {Typography} from "@mui/material";
import {useForm} from "react-hook-form";

interface CreateOrUpdateQuizFormProps {
    id?: number;
}

interface Inputs {

}

export const CreateOrUpdateQuizForm = ({id}: CreateOrUpdateQuizFormProps) => {

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: {errors},
    // } = useForm<Inputs>()
    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const isEditing = !!id
    return (
        <>
            {isEditing && <Typography>Edit this quiz.</Typography>}
            {!isEditing && <Typography>Create new quiz.</Typography>}


        </>)
}