import axios from 'axios';

export const record = async ( clicks, initials ) => {
    const config = {
        headers: { 'Content-Type': 'application/json'}
    };

    const body = JSON.stringify({clicks, initials});

    try {
        const res = await axios.post('http://localhost:5000/scores', body, config);

    } catch(err) {
        console.error(err.message);
    }
};

