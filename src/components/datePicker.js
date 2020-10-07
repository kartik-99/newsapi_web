import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";
import { Field, ErrorMessage } from "formik";
import useStyles from "../style";
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
            <ErrorMessage name={name} />
        </div>
    );
};

export default DatePicker;

// return (
//     <div>
//         <label htmlFor={name}>{title}</label>
//         <Field name={name}>
//             {({ form, field }) => {
//                 const { setFieldValue } = form;
//                 const { value } = field;
//                 return (
//                     <DateView
//                         id={name}
//                         {...field}
//                         {...rest}
//                         selected={value}
//                         onChange={(val) => setFieldValue(name, val)}
//                         className={classes.expand}
//                     />
//                 );
//             }}
//         </Field>
//         <ErrorMessage name={name} />
//     </div>
// );
