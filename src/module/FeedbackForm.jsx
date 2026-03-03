import React, { useState, useRef } from "react";

function FeedbackForm(props) {

    const [data, setData] = useState({
        name: "",
        email: "",
        category: "",
        priority: "",
        description: ""
    });

    const screenshotRef = useRef();
    const noteRef = useRef();

    function handleChange(e) {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newData = {
            ...data,
            ssURL: screenshotRef.current.value,
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

        screenshotRef.current.value = "";
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
            />

            <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
            />

            <select
                name="category"
                value={data.category}
                onChange={handleChange}
            >
                <option value="">Select Category</option>
                <option value="Bug">Bug</option>
                <option value="Suggestion">Suggestion</option>
                <option value="Complaint">Complaint</option>
                <option value="Other">Other</option>
            </select>

            <select
                name="priority"
                value={data.priority}
                onChange={handleChange}
            >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Detailed Description"
            />

            <input
                type="text"
                ref={screenshotRef}
                placeholder="Screenshot URL"
            />

            <textarea
                ref={noteRef}
                placeholder="Additional Notes"
            />

            <button type="submit">Submit</button>

        </form>
    );
}

export default FeedbackForm;