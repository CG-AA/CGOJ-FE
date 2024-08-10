import React, { useState, useEffect, useCallback } from 'react';
import { callAPI } from '../../API/API';
import { notify_error } from '../../notification/Notification';
//to do
function Contests() {
    const [contests, setContests] = useState([]);
    const [page, setPage] = useState(1);
    const [contestsPerPage, setContestsPerPage] = useState(10);
    const [contestsCount, setContestsCount] = useState(0);

    const fetchContests = useCallback(async () => {
        try {
            const response = await callAPI('GET', `/contests?page=${page}&problemsPerPage=${contestsPerPage}`);
            if(response.status !== 200) {
                notify_error(response.data || 'Failed to fetch contests');
                return;
            }
            setContests(response.data.contests);
            setContestsCount(response.data.contestsCount);
        } catch (error) {
            notify_error(error.message);
        }
    }, [page, contestsPerPage]);

    useEffect(() => {
        fetchContests();
    }, [fetchContests]);

    return (
    <div className="contests">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {contests.map((contest, index) => (
                    <tr key={index}>
                        <td>{contest.id}</td>
                        <td>{contest.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <label>Contests per page:</label>
            <input type="number" value={contestsPerPage} onChange={(e) => setContestsPerPage(e.target.value)} />
        </div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <div>
            <label>Page:</label>
            <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
            <span>/{Math.ceil(contestsCount / contestsPerPage)}</span>
        </div>
        <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
    );
}

export default Contests;