import React from "react";
import TextInput from "./textInput";
import ChipIn from "./chipInput";
import RadioInput from "./radioInput";
import MultiSelectInput from "./multiselectInput";
import MultiQuery from "./multiQueryInput";
import DatePicker from "./datePicker";

const FormikControl = (props) => {
    const { label, ...rest } = props;
    switch (label) {
        case "text":
            return <TextInput />;
        case "chiptext":
            return <ChipIn placeholder={props.placeholder} fullWidth />;
        case "radio":
            return <RadioInput {...rest} />;

        case "multiSelect":
            return <MultiSelectInput {...rest} />;
        case "multiQuery":
            return <MultiQuery {...rest} />;
        case "pickdate":
            return <DatePicker {...rest} />;
        default:
            return;
    }
};

export default FormikControl;
