import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
const DatePicker = (props) => {
    const { title, name, ...rest } = props;
    return (
        <div>
            <label htmlFor={name}>{title}</label>
            <Field name={name}>
                {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                        <DateView
                            id={name}
                            {...field}
                            {...rest}
                            selected={value}
                            onChange={(val) => setFieldValue(name, val)}
                        />
                    );
                }}
            </Field>
            <ErrorMessage name={name} />
        </div>
    );
};

export default DatePicker;
