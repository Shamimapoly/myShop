const { default: mongoose } = require("mongoose")

const dbConnection = async () => {
    if (!process.env.dbLink) {
        throw new Error("dbLink is missing from environment variables")
    }

    try {
        await mongoose.connect(process.env.dbLink, {
            serverSelectionTimeoutMS: 10000,
        })
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Error connecting to database:", error)
        throw error
    }
}

module.exports = dbConnection
