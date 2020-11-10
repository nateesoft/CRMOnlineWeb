const config = {
    apiServiceMember: 'http://localhost:5000/api/member/client',
    apiServiceRedeem: 'http://localhost:5000/api/redeem/client',
    apiServiceDB: 'd2ViZGFpbHlfMDAx',
    apiServiceAuth: 'Basic YWRtaW46c29mdHBvczIwMTM=',
    database: {
        host: "localhost",
        user: "root",
        password: 'myPassword',
        database: "webdaily_001",
        port: 3306,
        connectionLimit: 5,
        connectTimeout: 10000,
        acquireTimeout: 10000,
        waitForConnections: true,
        queueLimit: 0,
    },
    databaseMember: {
        host: "localhost",
        user: "root",
        password: 'myPassword',
        database: "mycrmbranch",
        port: 3306,
        connectionLimit: 5,
        connectTimeout: 10000,
        acquireTimeout: 10000,
        waitForConnections: true,
        queueLimit: 0,
    }
}

module.exports = config;
