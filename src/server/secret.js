module.exports = {
    client_secret: '', // client_secret of github authorization:  github-> settings ->  Developer settings to get
    db: {
        host: '127.0.0.1',
        port: 3306,
        database: 'ghchat',
        user: 'root',
        password: '',
    },
    secretValue: '', // secret of json web token
    qiniu: { // qiniu cdn configuration
        accessKey: '',
        secretKey: '',
        bucket: ''
    }
};
