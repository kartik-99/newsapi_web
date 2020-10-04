import React from "react";
import { Field } from "formik";
import { Radio } from "@material-ui/core";

function RadioInput(props) {
    const { title, name, options, ...rest } = props;
    return (
        <div className="form-control">
            <label>{title}</label>
            <Field name={name}>
                {({ field }) => {
                    return options.map((option) => {
                        return (
                            <React.Fragment key={option.key}>
                                <Radio
                                    type="radio"
                                    id={option.value}
                                    {...field}
                                    {...rest}
                                    value={option.value}
                                    checked={field.value === option.value}
                                />
                                <label htmlFor={option.value}>
                                    {option.key}
                                </label>
                            </React.Fragment>
                        );
                    });
                }}
            </Field>
        </div>
    );
}

export default RadioInput;
