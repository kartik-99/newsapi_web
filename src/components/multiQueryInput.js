import React from "react";
import { FieldArray } from "formik";
import FormikControl from "./formikControl";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TitleIcon from "@material-ui/icons/Title";
import Tooltip from "@material-ui/core/Tooltip";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export const newObject = {
    iq: "",
    exact: false,
    title: false,
    mustAppear: false,
    mustNotAppear: false,
};
const MultiQuery = (props) => {
    return (
        <div>
            <FieldArray name={props.name}>
                {(arrayHelpers) => (
                    <div>
                        {props.values.map((query, index) => (
                            <div key={index}>
                                {/** both these conventions do the same */}
                                <FormikControl
                                    label="text"
                                    title="Enter Search Query"
                                    name={`query.iq`}
                                />
                                <Tooltip title="Must be Exact Match" arrow>
                                    <ToggleButton
                                        selected={query.exact}
                                        size="small"
                                        name={`aq[${index}].exact`}
                                        onChange={() => {
                                            query.exact = !query.exact;
                                        }}
                                    >
                                        ==
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Must be in title" arrow>
                                    <ToggleButton
                                        size="small"
                                        selected={query.title}
                                        name={`aq[${index}].title`}
                                    >
                                        <TitleIcon fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>

                                <ToggleButtonGroup exclusive>
                                    <Tooltip title="Must Appear" arrow>
                                        <ToggleButton
                                            size="small"
                                            selected={query.mustAppear}
                                            name={`aq[${index}].mustAppear`}
                                        >
                                            <CheckCircleIcon size="small" />
                                        </ToggleButton>
                                    </Tooltip>
                                    <Tooltip title="Must not Appear" arrow>
                                        <ToggleButton
                                            size="small"
                                            selected={query.mustNotAppear}
                                            name={`aq[${index}].mustNotAppear`}
                                        >
                                            <NotInterestedIcon size="small" />
                                        </ToggleButton>
                                    </Tooltip>
                                </ToggleButtonGroup>

                                <IconButton
                                    size="small"
                                    onClick={() => arrayHelpers.remove(index)}
                                >
                                    <RemoveIcon size="small" />
                                </IconButton>
                            </div>
                        ))}
                        <IconButton
                            onClick={() => arrayHelpers.push(newObject)}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                )}
            </FieldArray>
        </div>
    );
};

export default MultiQuery;
