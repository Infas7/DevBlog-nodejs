const mongoos = require("mongoose");

const conncetDB = async () =>{
    try {
        mongoos.set('strictQuery', false);
        const conn = await mongoos.connect(process.env.MONGODB_URI);
        console.log(`Connected to db: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = conncetDB; 