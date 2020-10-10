import React from "react";
import { Field } from "formik";
import ChipInput from "material-ui-chip-input";

const ChipIn = (props) => {
    return (
        <Field>
            {(pro) => {
                const { field } = pro;

                return (
                    <div>
                        <label htmlFor={props.name}>{props.title}</label>
                        <ChipInput
                            placeholder={props.placeholder}
                            onChange={(a) => (field.value[props.name] = a)}
                            fullWidth
                            dataSource={props.dataSource}
                            dataSourceConfig={props.dataSourceConfig}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default ChipIn;
