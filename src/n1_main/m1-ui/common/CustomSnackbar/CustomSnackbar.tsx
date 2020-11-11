import React from "react";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import {useDispatch} from "react-redux";

type CustomSnackbarType = {
    error: string | null
    dispatchCallback: (param: any) => void
    open: boolean
    severity: "error" | "info" | "success" | "warning"
    sneckbarStyle: string
}

const CustomSnackbar = ({error, dispatchCallback, open, severity, sneckbarStyle}: CustomSnackbarType) => {

    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(dispatchCallback(null))
    }

    return (
        <Snackbar
            className={sneckbarStyle}
            open={open}
            autoHideDuration={5000} onClose={handleClose}>
            <Alert variant="filled" severity={severity}>
                {error}
            </Alert>
        </Snackbar>
    )
}
export default CustomSnackbar;