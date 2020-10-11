import React from "react";
import useStyles from "../style";
import { Field, getIn } from "formik";

function TextError(props) {
    const classes = useStyles();
    return <div className={classes.error}>{props.children}</div>;
}

export default TextError;

export const CustomErrorMessage = ({ name }) => (
    <Field name={name}>
        {({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? (
                <div style={{ color: "red" }}>{error} </div>
            ) : null;
        }}
    </Field>
);
