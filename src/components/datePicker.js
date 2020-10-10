import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";
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
                    const { setFieldValue } = form;
                    const { value } = field;
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
