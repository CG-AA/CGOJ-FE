import React, { useState, useEffect, useCallback } from 'react';
import { callAPI } from '../../API/API';
import { notify_error } from '../../notification/Notification';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [problemsPerPage, setProblemsPerPage] = useState(10);
    const [problemsCount, setProblemsCount] = useState(0);

    const fetchProblems = useCallback(async () => {
        try {
            const response = await callAPI('GET', `/problems?page=${page}&problemsPerPage=${problemsPerPage}`);
            setProblems(response.data.problems);
            setProblemsCount(response.data.problemsCount);
        } catch (error) {
            notify_error(error.message);
        }
    }, [page, problemsPerPage]);

    useEffect(() => {
        fetchProblems();
    }, [fetchProblems]);

    return (
    <div className="problems">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {problems.map((problem, index) => (
                    <tr key={index}>
                        <td>{problem.id}</td>
                        <td>{problem.title}</td>
                        <td>{problem.difficulty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <label>Problems per page:</label>
            <input type="number" value={problemsPerPage} onChange={(e) => setProblemsPerPage(e.target.value)} />
        </div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <div>
            <label>Page:</label>
            <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
            <span>/{Math.ceil(problemsCount / problemsPerPage)}</span>
        </div>
        <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
    );
}

export default Problems;