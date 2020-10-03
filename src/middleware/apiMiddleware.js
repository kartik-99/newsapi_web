import axios from "axios";
import {
    API,
    feedNews,
    feedSearchResults,
    feedSources,
    feedError,
} from "../actions";

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type !== API) return;

    const { url, data, label } = action.payload;

    axios.defaults.baseURL = "http://newsapi.org/v2/";
    axios.defaults.headers.common["Upgrade"] = "HTTP/3.0";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["X-Api-Key"] =
        "bdba5de1b490495796a1595f77ed3f37";

    axios
        .get(url, { params: data })
        .then((response) => {
            switch (label) {
                case "FEED":
                    dispatch(feedNews(response, action.payload.data.page));
                    break;
                case "SEARCH":
                    dispatch(
                        feedSearchResults(response, action.payload.data.page)
                    );
                    break;
                case "SOURCES":
                    dispatch(feedSources(response));
                    break;
                default:
                    return;
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch(feedError(error));
        });

    axios.interceptors.request.use((request) => {
        console.log("Starting Request : ", request);
        return request;
    });

    axios.interceptors.response.use((response) => {
        console.log("Response : ", response);
        return response;
    });
};

export default apiMiddleware;
