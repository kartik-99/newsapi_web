import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./formikControl";
import { sourcesOptions, langOptions, sortOptions } from "../sampleData";
import { newObject } from "../components/multiQueryInput";
import { Grid, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import useStyles from "../style";
import Tooltip from "@material-ui/core/Tooltip";

const validationSchema = Yup.object({});
const SIMPLE_QUERY = "SIMPLE_QUERY";
const ADV_QUERY = "ADV_QUERY";

const initialValues = {
    qType: SIMPLE_QUERY,
    aq: [newObject],
};

const qOptions = [
    { key: "Simple Queries", value: SIMPLE_QUERY },
    { key: "Advanced Queries", value: ADV_QUERY },
];

const SearchForm = (props) => {
    const classes = useStyles();
    const onSubmit = (values) => {
        console.log(values);
        const apiObject = {
            url: "/everything",
            label: "SEARCH",
            data: {
                pageSize: 20,
                page: 1,
            },
        };
        if (values.qType === SIMPLE_QUERY) {
            apiObject.data.q = values.q.join(",");
        }
        if (values.startDate) {
            apiObject.data.startDate = values.startDate;
        }
        if (values.endDate) {
            apiObject.data.endDate = values.endDate;
        }
        if (values.sources) {
            apiObject.data.sources = values.sources;
        }
        if (values.lang) {
            apiObject.data.language = values.lang.value;
        }
        if (values.sortBy) {
            apiObject.data.sortBy = values.sortBy.value;
        }
        console.log(apiObject);
        props.onSubmit(apiObject);
    };
    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(pro) => {
                    return (
                        <Form>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <FormikControl
                                        label="radio"
                                        options={qOptions}
                                        name={"qType"}
                                        defaultValue={SIMPLE_QUERY}
                                    />
                                </Grid>
                                {pro.values.qType === SIMPLE_QUERY && (
                                    <Grid item xs={12}>
                                        <Box className={classes.box}>
                                            <FormikControl
                                                label="chiptext"
                                                placeholder="Enter Search Queries"
                                                name={"sq"}
                                            />
                                        </Box>
                                    </Grid>
                                )}
                                {/* {console.log(pro.values)} */}
                                {pro.values.qType === ADV_QUERY && (
                                    <Grid item xs={12}>
                                        <FormikControl
                                            label="multiQuery"
                                            values={pro.values.aq}
                                            name="aq"
                                        />
                                    </Grid>
                                )}
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <FormikControl
                                            label={"multiSelect"}
                                            isMulti={true}
                                            options={sourcesOptions}
                                            name={"sources"}
                                            title="Select Sources..."
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Tooltip
                                            title="You can add additional domains here. eg. bbc.com"
                                            arrow
                                        >
                                            <Box className={classes.box}>
                                                <FormikControl
                                                    label="chiptext"
                                                    name={"domains"}
                                                    placeholder="Additional News Domains"
                                                />
                                            </Box>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <FormikControl
                                            label={"pickdate"}
                                            name="startDate"
                                            title="Start Date"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikControl
                                            label={"pickdate"}
                                            name="endDate"
                                            title="End Date"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    item
                                    xs={12}
                                    spacing={2}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <FormikControl
                                            label="multiSelect"
                                            options={langOptions}
                                            isMulti={false}
                                            name="lang"
                                            title="Select Language"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikControl
                                            label="multiSelect"
                                            options={sortOptions}
                                            isMulti={false}
                                            name="sortBy"
                                            title="Sort by..."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SearchForm;
