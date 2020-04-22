import axios from 'axios';

export const record = async ( clicks, initials ) => {
    const config = {
        headers: { 'Content-Type': 'application/json'}
    };

    const body = JSON.stringify({clicks, initials});

    let domain = 'http://localhost:8181';

    if(process.env.NODE_ENV === 'production'){
        domain = ''
    }

    try {
        await axios.post(domain + '/scores', body, config);

    } catch(err) {
        console.error(err.message);
    }
};

