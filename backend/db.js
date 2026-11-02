const { default: mongoose } = require("mongoose")
const dns = require("node:dns/promises")

const createAtlasStandardUri = async (srvUri) => {
    const uri = new URL(srvUri)
    const username = encodeURIComponent(uri.username)
    const password = encodeURIComponent(uri.password)
    const database = uri.pathname.replace(/^\/+/, "")
    const records = await dns.resolveSrv(`_mongodb._tcp.${uri.hostname}`)
    const atlasHosts = records.map((record) => record.name)
    const hosts = atlasHosts.map((host) => `${host}:27017`).join(",")

    return `mongodb://${username}:${password}@${hosts}/${database}?tls=true&authSource=admin&retryWrites=true&w=majority`
}

const dbConnection = async () => {
    if (!process.env.dbLink) {
        throw new Error("dbLink is missing from the environment variables")
    }

    let connectionUri = process.env.dbLink

    try {
        const srvHost = new URL(connectionUri).hostname
        await dns.resolveTxt(srvHost)
    } catch (error) {
        if (error.code === "ETIMEOUT" && connectionUri.startsWith("mongodb+srv://")) {
            connectionUri = await createAtlasStandardUri(connectionUri)
        } else {
            throw error
        }
    }

    try {
        await mongoose.connect(connectionUri, {
            serverSelectionTimeoutMS: 10000,
        })
    } catch (error) {
        if (error?.cause?.code === "ETIMEOUT" && connectionUri.startsWith("mongodb+srv://")) {
            connectionUri = await createAtlasStandardUri(process.env.dbLink)
            await mongoose.connect(connectionUri, {
                serverSelectionTimeoutMS: 10000,
            })
        } else {
            throw error
        }
    }

    console.log("Database connected successfully")
}
module.exports = dbConnection