function responseData(response) {
    const data = response.data;

    if (data.success == false && data.error.code == 1200) {
        localStorage.removeItem('access_token');
    }

    return data;
}

export {
    responseData
}