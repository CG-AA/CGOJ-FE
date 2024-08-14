import React, { useState, useEffect } from 'react';
import { callAPI } from '../../API/API';
import { notify_error } from '../../notification/Notification';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProblems, setTotalProblems] = useState(0);
    const problemsPerPage = 10;

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await callAPI('GET', `/problems?page=${currentPage}&problemsPerPage=${problemsPerPage}`);
                if (response.status !== 200) {
                    console.log(response.data);
                    return;
                }
                setProblems(response.data.problems);
                setTotalProblems(response.data.totalProblems);
            } catch (error) {
                notify_error(error.message);
            }

        };

        fetchProblems();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(totalProblems / problemsPerPage);

    return (
        <div className="problems">
            <h1>Problems</h1>
            <ul>
                {problems.map(problem => (
                    <li key={problem.id}>
                        <h2>{problem.title}</h2>
                        <p>{problem.description}</p>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Problems;