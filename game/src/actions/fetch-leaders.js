import axios from 'axios';

export const fetchLeaders = async ()  => {
    const config = {
        headers: { 'Content-Type': 'application/json'}
    };

    let domain = 'http://localhost:8181';

    if(process.env.NODE_ENV === 'production'){
        domain = ''
    }

    try {
        return await axios.get(domain + '/scores', config);

    } catch(err) {
        console.error(err.message);
    }
};

