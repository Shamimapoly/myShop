const mongoose = require("mongoose")

const dbConnection = async () => {
    if (!process.env.dbLink) {
        throw new Error("dbLink is missing from environment variables")
    }
    await mongoose.connect(process.env.dbLink)
    console.log("Database connected successfully")
}

module.exports = dbConnection
