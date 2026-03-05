import React, { useState } from "react";
import FeedbackForm from "./module/FeedbackForm";
import FeedbackList from "./module/FeedbackList";

import './app.css'

function App() {

    const [data, setData] = useState([]);

    function handleAdd(newItem) {
        setData(prev => [...prev, newItem]);
    }

    return (
        <div>
            <h2>Feedback System</h2>

            <FeedbackForm addFeedback={handleAdd} />

            <FeedbackList list={data} />
        </div>
    );
}

export default App;