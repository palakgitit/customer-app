import React, { useState, useRef } from "react";

function FeedbackForm(props) {

    
const [data, setData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    description: ""
});

const [error, setError] = useState({});
const [screenshots, setScreenshots] = useState([""]);

const noteRef = useRef();

function handleChange(e) {
    const { name, value } = e.target;

    setData({
        ...data,
        [name]: value
    });

    let message = "";

    if (name === "email" && value) {
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(value)) {
            message = "Invalid email format";
        }
    }

    if (name === "description" && value.length < 10) {
        message = "Description must be at least 10 characters";
    }

    setError({
        ...error,
        [name]: message
    });
}

function handleScreenshotChange(index, value) {
    const newList = [...screenshots];
    newList[index] = value;
    setScreenshots(newList);
}

function addScreenshot() {
    setScreenshots([...screenshots, ""]);
}

function removeScreenshot(index) {
    const newList = screenshots.filter((_, i) => i !== index);
    setScreenshots(newList);
}

function handleSubmit(e) {
    e.preventDefault();

    let newError = {};

    if (!data.name) newError.name = "Name is required";
    if (!data.email) newError.email = "Email is required";
    if (!data.category) newError.category = "Category is required";
    if (!data.priority) newError.priority = "Priority is required";
    if (!data.description) newError.description = "Description is required";

    setError(newError);

    if (Object.keys(newError).length > 0) {
        return;
    }

    const newData = {
        ...data,
        screenshots: screenshots,
        note: noteRef.current.value
    };

    props.addFeedback(newData);

    setData({
        name: "",
        email: "",
        category: "",
        priority: "",
        description: ""
    });

    setScreenshots([""]);
    setError({});
    noteRef.current.value = "";
}

return (
    <form onSubmit={handleSubmit}>

        <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={error.name ? "error-input" : ""}
        />
        <p>{error.name}</p>

        <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className={error.email ? "error-input" : ""}
        />
        <p>{error.email}</p>

        <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className={error.category ? "error-input" : ""}
        >
            <option value="">Select Category</option>
            <option value="Bug">Bug</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Complaint">Complaint</option>
            <option value="Other">Other</option>
        </select>
        <p>{error.category}</p>

        <select
            name="priority"
            value={data.priority}
            onChange={handleChange}
            className={error.priority ? "error-input" : ""}
        >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <p>{error.priority}</p>

        <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Detailed Description"
            className={error.description ? "error-input" : ""}
        />
        <p>{error.description}</p>

        <h4>Screenshots</h4>

        {screenshots.map((shot, index) => (
            <div key={index}>
                <input
                    type="text"
                    value={shot}
                    placeholder="Screenshot URL"
                    onChange={(e) =>
                        handleScreenshotChange(index, e.target.value)
                    }
                />

                <button type="button" onClick={() => removeScreenshot(index)}>
                    Remove
                </button>
            </div>
        ))}

        <button type="button" onClick={addScreenshot}>
            Add Screenshot
        </button>

        <textarea
            ref={noteRef}
            placeholder="Additional Notes"
        />

        <button type="submit">
            Submit
        </button>

    </form>
);

}

export default FeedbackForm;
