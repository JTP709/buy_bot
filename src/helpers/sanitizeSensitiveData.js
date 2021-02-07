const sanitizeSensitiveData = userInfo => {
    const data = { ...userInfo };
    data.password = '*********';
    data.code = '***';

    return data
}

module.exports = sanitizeSensitiveData;
