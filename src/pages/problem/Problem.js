import React, { useState, useCallback } from 'react';
import CodeSubmitForm from './Submit';
import { useAPI } from '../../API/API';
import { useParams } from 'react-router-dom';
import { notify_error } from '../../notification/Notification';
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
    const useAPI = useAPI();
    const { id } = useParams();

    const fetchProblem = useCallback(async () => {
            try {
                const response = await API('GET', `/problems/${id}`);
                if(response.status !== 200) {
                    notify_error(response.data.error || 'An unexpected error occurred');
                    return;
                }
                setProblem(response.data);
            } catch (error) {
                notify_error('An unexpected error occurred' || error);
            }
    }, [API]);

    useEffect(() => {
        fetchProblem();
    }, [fetchProblem]);
    

    return (
        <>
        <div className="problem">
            <h1>{problem.title}</h1>
            <p>{problem.description}</p>
            <h2>Input Format</h2>
            <p>{problem.input_format}</p>
            <h2>Output Format</h2>
            <p>{problem.output_format}</p>
        </div>
        <CodeSubmitForm />
        </>
    );
}

export default Problem;