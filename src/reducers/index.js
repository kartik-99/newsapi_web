import bookmarks from "./bookmarksReducer";
import sources from "./sourcesReducer";
import apiData from "./apiReducer";
import { combineReducers } from "redux";

const allData = combineReducers({
    bookmarks: bookmarks,
    sources: sources,
    data: apiData,
});
export default allData;
