import React from "react";
import TextField from "@material-ui/core/TextField";
import { Field } from "formik";

const TextInput = (props) => {
    return (
        <Field>
            {(pro) => {
                const { field } = pro;

                return (
                    <div>
                        <TextField
                            id={props.name}
                            label={props.title}
                            placeholder={props.title}
                            variant="outlined"
                            onChange={(a) =>
                                (field.value[props.name] = a.target.value)
                            }
                            size="small"
                            fullWidth={true}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default TextInput;
