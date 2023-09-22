import {Box, OutlinedInput} from "@mui/material";
import {Controller} from "react-hook-form";
import React from "react";

export const ReactHookFormInput = ({name, control, ...extraProps}: { name: any; control: any; [key: string]: any }) => {
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