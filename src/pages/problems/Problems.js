import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Problems.css';

import useAPI from '../../API/api';
import { NotificationContext } from '../../components/notifications/NotificationList';

const Problems = () => {
    const { addNotification } = useContext(NotificationContext);
    const [problems, setProblems] = useState([]);
    const [page, setPage] = useState(1);

    const { callAPI } = useAPI();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const problemsPerPage = 10;
                const response = await callAPI(`/problems?page=${page}&problemsPerPage=${problemsPerPage}`, 'GET', null);
                if (response.status === 404) {
                    addNotification(1, 'No problems found');
                } else {
                    setProblems(response);
                }
            } catch (error) {
            }
        };

        fetchProblems();
    }, [page, callAPI, addNotification]);

    const ProblemsTable = problems.map((problem) => {
        return (
            <tr key={problem.id}>
                <td> <Link to={`/problem/${problem.id}`}> {problem.id} </Link> </td>
                <td> <Link to={`/problem/${problem.id}`}> {problem.name} </Link> </td>
                <td> <Link to={`/problem/${problem.id}`}> {problem.difficulty} </Link> </td>
            </tr>
        );
    });

    return (
        <>
            <table class="problems-table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Difficulty </th>
                    </tr>
                </thead>
                <tbody>
                    {ProblemsTable}
                </tbody>
            </table>
            <button onClick={() => setPage(page + 1)}>Next Page</button>
        </>
    );
}

export default Problems;