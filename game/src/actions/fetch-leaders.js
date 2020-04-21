import axios from 'axios';

export const fetchLeaders = async ()  => {
    const config = {
        headers: { 'Content-Type': 'application/json'}
    };

    try {
        return await axios.get('http://localhost:443/scores', config);

    } catch(err) {
        console.error(err.message);
    }
};

