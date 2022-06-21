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
        //RefreshToken
        return
    } else {
        console.log(response);
        return
    }


}

module.exports = makeRequest