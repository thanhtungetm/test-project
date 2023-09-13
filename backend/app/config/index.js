const config = {
    app: {
        port: process.env.PORT || 6868
    },
    db: {
        url: "mongodb://192.168.1.69:27017/(LETHANHTUNG)_DB_TESTING"
    },
    jwt: {
        secret: "test"
    }
};

module.exports = config;