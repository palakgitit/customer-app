

function FeedbackCard({ feedback }) {
    return (
        <div className="card">
            <h3>{feedback.name}</h3>
            <p>Email: {feedback.email}</p>
            <p>Category: {feedback.category}</p>
            <p>Priority: {feedback.priority}</p>
            <p>Description: {feedback.description}</p>

            {feedback.ssURL && <p>Screenshot: {feedback.ssURL}</p>}
            {feedback.note && <p>Note: {feedback.note}</p>}
        </div>
    );
}

export default FeedbackCard;