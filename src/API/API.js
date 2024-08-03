const axios = require('axios');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, 'settings.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

const url = settings.BEurl;

function callAPI(method, endpoint, data) {
    const fullUrl = `${url}${endpoint}`;

    return axios({
        method: method,
        url: fullUrl,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('jwt')}`
        }
    })
    .then(response => {
        console.log('Response:', response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error.message);
        throw error;
    });
}