import React from 'react'
import { TextField ,InputAdornment , Grid , IconButton } from "@material-ui/core";
import {Visibility , VisibilityOff} from '@material-ui/icons'
const Input = ({name , onChange,label , half , autoFocus , type ,handleShowPassword , disabled}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name = {name}
                onChange ={onChange}
                variant='outlined'
                required
                fullWidth
                label = {label}
                autoFocus = {autoFocus}
                type = {type}
                disabled = {disabled}
                InputProps={name === 'password' ? {
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default Input
