import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import FormikControl from "../components/formikControl";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/Sort";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import * as Yup from "yup";
import { sourcesOptions, countryCodes, categoryCodes } from "../sampleData";
import TextError from "./textError";

const SOURCES = "sources";
const CATEGORY = "category";
const COUNTRY = "country";
const Q = "q";
const initialValues = {
    filter: "",
};

initialValues[Q] = "";
initialValues[SOURCES] = [];
initialValues[CATEGORY] = [];
initialValues[COUNTRY] = [];

const filterOptions = [
    { label: "Sources", value: SOURCES },
    { label: "Country", value: COUNTRY },
    { label: "Category", value: CATEGORY },
    { label: "None", value: "" },
];

const FeedSearchForm = (props) => {
    const [toggleFilters, setToggleFilters] = useState(false);
    const [filter, setFilter] = useState(false);
    const validationSchema = Yup.object({
        q: Yup.string().required("Search Query Required!"),
    });

    const onSubmit = (values) => {
        const apiObject = {
            url: "/top-headlines",
            label: "FEED",
            data: {
                q: values.q,
                pageSize: 20,
                page: 1,
            },
        };
        switch (values.filter.value) {
            case SOURCES:
                apiObject.data[SOURCES] = values.sources
                    .map((source) => {
                        return source.value;
                    })
                    .join(",");
                break;
            case COUNTRY:
                apiObject.data[COUNTRY] = values.country.value;
                apiObject.data[SOURCES] = "all";
                break;
            case CATEGORY:
                apiObject.data[CATEGORY] = values.country.value;
                apiObject.data[SOURCES] = "all";
                break;
            default:
                apiObject.data[SOURCES] = "all";
        }
        console.log("Submitted : ", apiObject);
        props.setSearchState(apiObject);
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
                            <Grid item container direction="column">
                                <ErrorMessage name="q" component={TextError} />
                                <Grid container item direction="row">
                                    <Grid
                                        item
                                        style={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <FormikControl
                                            label="text"
                                            title="Enter Search Query"
                                            name={Q}
                                        />
                                    </Grid>
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            pro.values = initialValues;
                                            props.refreshFeed();
                                        }}
                                    >
                                        <RefreshIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setToggleFilters(!toggleFilters);
                                        }}
                                    >
                                        <SortIcon />
                                    </IconButton>
                                </Grid>
                                {toggleFilters && (
                                    <Grid
                                        item
                                        container
                                        direction="row"
                                        spacing={1}
                                    >
                                        <Grid item xs={12} sm={3}>
                                            <FormikControl
                                                label="multiSelect"
                                                options={filterOptions}
                                                title="Select Filter..."
                                                name="filter"
                                                isMulti={false}
                                                setFilter={setFilter}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={9}>
                                            {console.log(
                                                pro.values.filter.value
                                            )}
                                            {filter === "sources" && (
                                                <FormikControl
                                                    label="multiSelect"
                                                    options={sourcesOptions}
                                                    title="Select Sources"
                                                    name={SOURCES}
                                                    isMulti={true}
                                                />
                                            )}
                                            {filter === "country" && (
                                                <FormikControl
                                                    label="multiSelect"
                                                    options={countryCodes}
                                                    title="Select Country"
                                                    name={COUNTRY}
                                                    isMulti={false}
                                                />
                                            )}
                                            {filter === "category" && (
                                                <FormikControl
                                                    label="multiSelect"
                                                    options={categoryCodes}
                                                    title="Select Category"
                                                    name={CATEGORY}
                                                    isMulti={false}
                                                />
                                            )}
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default FeedSearchForm;
