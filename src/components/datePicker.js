import React from "react";
import { TextField } from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import useStyles from "../style";
import TextError from "./textError";

const DatePicker = (props) => {
    const { title, name, ...rest } = props;
    const classes = useStyles();
    return (
        <div>
            <Field name={name}>
                {({ form, field }) => {
                    return (
                        <TextField
                            id={name}
                            name={name}
                            {...field}
                            {...rest}
                            label={title}
                            type="date"
                            variant="outlined"
                            className={classes.expand}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

export default DatePicker;
