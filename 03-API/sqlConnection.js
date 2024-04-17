const { createConnection } = require("mysql2/promise");

let connection;

// These fields naming are not optional, expects: host, user, database, password
async function connectSQL(host, user, database, password){

    try {
        connection = await createConnection({
            host, user, database, password
        })
    } catch (error) {
        console.error("DB fail to connect", error);
    }

    console.log("DB is connected");
}

// refactoring so do not need input the params again;
function getConnection(){
    return connection;
}

module.exports = {
    connectSQL,
    getConnection
}
