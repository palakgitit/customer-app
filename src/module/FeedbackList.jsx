import React from "react";
import FeedbackCard from "./FeedbackCard";

function FeedbackList(props) {

    const { list } = props;

    if (list.length === 0) {
        return <p className="card-msg">No feedback submitted yet.</p>;
    }

    return (
        <div>
            {list.map((item, index) => (
                <FeedbackCard
                    key={index}
                    feedback={item}
                />
            ))}
        </div>
    );
}

export default FeedbackList;