const makeRequest = async  (method, url, query) => {
    
    const options = {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body:  `{"query":"${query}"}`
    };

    const response = await fetch(url, options);

    if(response.status === 200) {
        const data = await response.json();
        return data;
    } else if (response.status === 401) {
        return 401;
    } else {
        return
    }


}

export default makeRequest