const refreshToken = async  (refresh_token) => {
    
    const options = {
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        },
        body:  `{"query":"${refresh_token}"}`
    };

    let response = await fetch(`http://localhost:3000/refresh_token`, options);

    if(response.status === 200) {
        const refresh = await response.json();
        return refresh.access_token;
    } else {
        console.log(response.status)
    }


}

export default refreshToken