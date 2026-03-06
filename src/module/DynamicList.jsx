import React, { useRef } from "react";

function DynamicList({ screenshots, setScreenshots, noteRef }) {

    const screenshotRefs = useRef([]);

    function handleChange(index, value) {
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

    return (
        <div className="dynamic-component">

            <h4>Screenshots</h4>

            {screenshots.map((shot, index) => (
                <div key={index} className="dynamic-row">

                    <input
                        type="text"
                        defaultValue={shot}
                        ref={(el) => (screenshotRefs.current[index] = el)}
                        placeholder="Screenshot URL"
                        onChange={(e) => handleChange(index, e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => removeScreenshot(index)}
                    >
                        Remove
                    </button>

                </div>
            ))}

            <button type="button" onClick={addScreenshot}>
                Add Screenshot
            </button>

            <div className="dynamic-textarea">
                <h4>Additional Notes</h4>

                <textarea
                    ref={noteRef}
                    placeholder="Additional Notes"
                />
            </div>

        </div>
    );

}

export default DynamicList;