import React, { Component } from "react";

import NewsGrid from "../components/newsGrid";
import { sampleRequest } from "../sampleData";
class Feed extends Component {
    render() {
        return (
            <div>
                <NewsGrid news={sampleRequest.articles} />
            </div>
        );
    }
}

export default Feed;
