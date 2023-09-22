import {Box, Checkbox, FormControlLabel, OutlinedInput} from "@mui/material";
import {Controller} from "react-hook-form";
import React from "react";

export const ReactHookFormCheckbox = ({name, control, label}: {
    name: any;
    control: any;
    label: string;
}) => {
    return (
        <Box sx={{mb: 1}}>
            <Controller
                name={name}
                control={control}
                defaultValue={false}
                render={({field}) =>
                    <FormControlLabel control={<Checkbox checked={field.value}/>} label={label}/>}
            />
        </Box>
    )
}