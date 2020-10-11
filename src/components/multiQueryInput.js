import React from "react";
import { FieldArray, Field } from "formik";
import { Grid, TextField, IconButton, Checkbox } from "@material-ui/core";
import Select from "react-select";
import { CustomErrorMessage } from "./textError";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

export const newObject = {
    iq: "",
    exact: false,
    title: false,
    appear: { label: "May/May not appear", value: "normal" },
};

export const appear = [
    { label: "May/May not appear", value: "normal" },
    { label: "Must Appear", value: "mustAppear" },
    { label: "Must Not Appear", value: "mustNotAppear" },
];
const MultiQuery = (props) => {
    return (
        <FieldArray name={props.name} enableReinitialize>
            {(arrayHelpers) => {
                return (
                    <div>
                        {props.values.map((query, index) => (
                            <React.Fragment>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    key={index}
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={3}>
                                        <Field
                                            component={TextField}
                                            label="Enter Search Query"
                                            variant="outlined"
                                            size="small"
                                            fullWidth={true}
                                            name={`${props.name}[${index}].iq`}
                                            onChange={(a) => {
                                                props.values[index].iq =
                                                    a.target.value;
                                            }}
                                        />
                                        <CustomErrorMessage
                                            name={`${props.name}[${index}].iq`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Select
                                            options={appear}
                                            isMulti={false}
                                            isSearchable={false}
                                            defaultValue={{
                                                label: "May/May not appear",
                                                value: "normal",
                                            }}
                                            onChange={(a) => {
                                                props.values[index].appear = a;
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={5} sm={2}>
                                        <Field
                                            component={Checkbox}
                                            name={`${props.name}[${index}].title`}
                                            onChange={() => {
                                                props.values[
                                                    index
                                                ].title = !props.values[index]
                                                    .title;
                                            }}
                                        />
                                        In Title
                                    </Grid>
                                    <Grid item xs={5} sm={2}>
                                        <Field
                                            component={Checkbox}
                                            name={`${props.name}[${index}].exact`}
                                            onChange={() => {
                                                props.values[
                                                    index
                                                ].exact = !props.values[index]
                                                    .exact;
                                            }}
                                        />
                                        Exact Match
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                            onClick={() =>
                                                arrayHelpers.push(newObject)
                                            }
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                    {props.values.length > 1 && (
                                        <Grid item xs={1}>
                                            <IconButton
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                }
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </div>
                );
            }}
        </FieldArray>
    );
};

export default MultiQuery;
