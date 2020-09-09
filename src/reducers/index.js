import bookmarks from "./bookmarksReducer";
import sources from "./sourcesReducer";
import { combineReducers } from "redux";

const allData = combineReducers({
    bookmarks: bookmarks,
    sources: sources,
});
export default allData;
