import React from "react";
import { Field } from "formik";
import Select from "react-select";

function MultiSelectInput(props) {
    const { title, name, options, ...rest } = props;
    return (
        <div className="form-control">
            <Field id={name} name={name} {...rest} enableReinitialise={true}>
                {(pro) => {
                    const { form } = pro;
                    return (
                        <div>
                            <Select
                                options={props.options}
                                isMulti={props.isMulti}
                                isSearchable={true}
                                onChange={(a) => {
                                    form.values[name] = a;
                                    if (props.setFilter) {
                                        props.setFilter(a.value);
                                    }
                                    // console.log("now : ", form.values[name]);
                                }}
                                placeholder={props.title}
                            />
                        </div>
                    );
                }}
            </Field>
        </div>
    );
}

export default MultiSelectInput;
