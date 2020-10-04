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
                            label={props.placeholder}
                            onChange={(a) => (field.value.q = a)}
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
