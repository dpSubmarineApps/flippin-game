import axios from 'axios';

export const record = async ( clicks, initials ) => {
    const config = {
        headers: { 'Content-Type': 'application/json'}
    };

    const body = JSON.stringify({clicks, initials});

    try {
        await axios.post('http://localhost:8181/scores', body, config);

    } catch(err) {
        console.error(err.message);
    }
};
