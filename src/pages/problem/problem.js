import React, { useState } from 'react';

function Problem() {
    const [problem, setProblem] = useState({
        id: 0,
        owner_id: 0,
        title: '',
        description: '',
        input_format: '',
        output_format: '',
        difficulty: ''
    });

    return (
        <div className="problem">
            <h1>{problem.title}</h1>
            <p>{problem.description}</p>
            <h2>Input Format</h2>
            <p>{problem.input_format}</p>
            <h2>Output Format</h2>
            <p>{problem.output_format}</p>
        </div>
    );
}

export default Problem;