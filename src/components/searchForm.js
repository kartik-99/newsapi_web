import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./formikControl";
import { sourcesOptions, langOptions, sortOptions } from "../sampleData";
import { newObject } from "../components/multiQueryInput";
const initialValues = {
    qType: "",
    aq: [newObject],
};

const validationSchema = Yup.object({});
const SIMPLE_QUERY = "SIMPLE_QUERY";
const ADV_QUERY = "ADV_QUERY";

const qOptions = [
    { key: "Simple Queries", value: SIMPLE_QUERY },
    { key: "Advanced Queries", value: ADV_QUERY },
];

const SearchForm = (props) => {
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
                            <FormikControl
                                label="radio"
                                options={qOptions}
                                name={"qType"}
                            />
                            {pro.values.qType === SIMPLE_QUERY && (
                                <FormikControl label="chiptext" name={"sq"} />
                            )}
                            {/* {console.log(pro.values)} */}
                            {pro.values.qType === ADV_QUERY && (
                                <FormikControl
                                    label="multiQuery"
                                    values={pro.values.aq}
                                    name="aq"
                                />
                            )}
                            <FormikControl
                                label={"multiSelect"}
                                isMulti={true}
                                options={sourcesOptions}
                                name={"sources"}
                                title="Select Sources..."
                            />
                            <FormikControl
                                label={"pickdate"}
                                name="startDate"
                                title="Start Date"
                            />
                            <FormikControl
                                label={"pickdate"}
                                name="endDate"
                                title="End Date"
                            />
                            <FormikControl
                                label="multiSelect"
                                options={langOptions}
                                isMulti={false}
                                name="lang"
                                title="Select Language"
                            />
                            <FormikControl
                                label="multiSelect"
                                options={sortOptions}
                                isMulti={false}
                                name="sortBy"
                                title="Sort by..."
                            />
                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SearchForm;
