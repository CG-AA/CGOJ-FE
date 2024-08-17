import React, { useState } from 'react';
import {notify_error, notify_success} from '../../notification/Notification';
import { useAPI } from '../../API/API';

const onUpload = async (json) => {
    try {
        const response = await useAPI('POST', '/manage_panel/problems', json);
        if (response.status === 200) {
            notify_success('Problem uploaded successfully');
        } else {
            if (response.data.message) {
                notify_error(response.data.message);
            }
        }
    } catch (error) {
        notify_error(error.message);
    }
};

function UploadProblem({ onUpload }) {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                onUpload(json);
            } catch (error) {
                notify_error('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <label>or Upload Problem:</label>
            <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
}

export default function AddProblem() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [difficulty, setDifficulty] = useState('Easy');
    const [sampleInputs, setSampleInputs] = useState(['']);
    const [sampleOutputs, setSampleOutputs] = useState(['']);
    const [tags, setTags] = useState(['']);
    const [testCases, setTestCases] = useState([{ input: '', output: '', timeLimit: 0, memoryLimit: 0, score: 0 }]);
    const [roles, setRoles] = useState([{ roleName: '', permissionFlags: 0 }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const problemData = {
            title,
            description,
            input_format: inputFormat,
            output_format: outputFormat,
            difficulty,
            sample_inputs: sampleInputs,
            sample_outputs: sampleOutputs,
            tags,
            testcases: testCases,
            roles
        };

        try {
            const response = await fetch('/manage_panel/problems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwt')
                },
                body: JSON.stringify(problemData)
            });

            if (response.ok) {
                notify_success('Problem created successfully');
            } else {
                const data = await response.json();
                notify_error(data.message || 'Error creating problem');
            }
        } catch (error) {
            notify_error(error.message);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Input Format:</label>
                <textarea value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} required />
            </div>
            <div>
                <label>Output Format:</label>
                <textarea value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} required />
            </div>
            <div>
                <label>Difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div>
                <label>Sample Inputs:</label>
                {sampleInputs.map((input, index) => (
                    <input key={index} type="text" value={input} onChange={(e) => {
                        const newSampleInputs = [...sampleInputs];
                        newSampleInputs[index] = e.target.value;
                        setSampleInputs(newSampleInputs);
                    }} required />
                ))}
                <button type="button" onClick={() => setSampleInputs([...sampleInputs, ''])}>Add Sample Input</button>
            </div>
            <div>
                <label>Sample Outputs:</label>
                {sampleOutputs.map((output, index) => (
                    <input key={index} type="text" value={output} onChange={(e) => {
                        const newSampleOutputs = [...sampleOutputs];
                        newSampleOutputs[index] = e.target.value;
                        setSampleOutputs(newSampleOutputs);
                    }} required />
                ))}
                <button type="button" onClick={() => setSampleOutputs([...sampleOutputs, ''])}>Add Sample Output</button>
            </div>
            <div>
                <label>Tags:</label>
                {tags.map((tag, index) => (
                    <input key={index} type="text" value={tag} onChange={(e) => {
                        const newTags = [...tags];
                        newTags[index] = e.target.value;
                        setTags(newTags);
                    }} required />
                ))}
                <button type="button" onClick={() => setTags([...tags, ''])}>Add Tag</button>
            </div>
            <div>
                <label>Test Cases:</label>
                {testCases.map((testCase, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Input" value={testCase.input} onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[index].input = e.target.value;
                            setTestCases(newTestCases);
                        }} required />
                        <input type="text" placeholder="Output" value={testCase.output} onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[index].output = e.target.value;
                            setTestCases(newTestCases);
                        }} required />
                        <input type="number" placeholder="Time Limit" value={testCase.timeLimit} onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[index].timeLimit = parseInt(e.target.value);
                            setTestCases(newTestCases);
                        }} required />
                        <input type="number" placeholder="Memory Limit" value={testCase.memoryLimit} onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[index].memoryLimit = parseInt(e.target.value);
                            setTestCases(newTestCases);
                        }} required />
                        <input type="number" placeholder="Score" value={testCase.score} onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[index].score = parseInt(e.target.value);
                            setTestCases(newTestCases);
                        }} required />
                    </div>
                ))}
                <button type="button" onClick={() => setTestCases([...testCases, { input: '', output: '', timeLimit: 0, memoryLimit: 0, score: 0 }])}>Add Test Case</button>
            </div>
            <div>
                <label>Roles:</label>
                {roles.map((role, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Role Name" value={role.roleName} onChange={(e) => {
                            const newRoles = [...roles];
                            newRoles[index].roleName = e.target.value;
                            setRoles(newRoles);
                        }} required />
                        <input type="number" placeholder="Permission Flags" value={role.permissionFlags} onChange={(e) => {
                            const newRoles = [...roles];
                            newRoles[index].permissionFlags = parseInt(e.target.value);
                            setRoles(newRoles);
                        }} required />
                    </div>
                ))}
                <button type="button" onClick={() => setRoles([...roles, { roleName: '', permissionFlags: 0 }])}>Add Role</button>
            </div>
            <button type="submit">Submit</button>
        </form>
        <UploadProblem onUpload={onUpload} />
        </>
    );
}