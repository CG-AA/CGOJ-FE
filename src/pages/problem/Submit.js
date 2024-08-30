import React, { useState } from 'react';

const CodeSubmitForm = () => {
    const [fileContent, setFileContent] = useState('');
    const [code, setCode] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileContent(event.target.result);
        };
        reader.readAsText(file);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('File Content:', fileContent);
        console.log('Written Code:', code);
    };

    return (
        <div>
            <h2>Submit Your Code</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileUpload">Upload File:</label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".txt,.js,.py,.java"
                        onChange={handleFileUpload}
                    />
                </div>
                <div>
                    <label htmlFor="codeInput">Or Write Code:</label>
                    <textarea
                        id="codeInput"
                        rows="10"
                        cols="50"
                        value={code}
                        onChange={handleCodeChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CodeSubmitForm;