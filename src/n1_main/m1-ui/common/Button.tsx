import React from "react";
import {Button} from "@material-ui/core";

type ButtonPropsType = {
    nameButton: string
}

const ButtonMaterial = (props: ButtonPropsType, {...rest}) => {
    return <Button variant="contained" color="primary" {...rest}>{props.nameButton}</Button>
}

export default ButtonMaterial;