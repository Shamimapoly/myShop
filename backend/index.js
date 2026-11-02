require('dotenv').config({ path: require('path').join(__dirname, '.env') })

const express = require('express');
const app = express();
const port = 8000;
const host = "0.0.0.0";
const cors = require('cors');
const dbConnection = require('./db');
const route = require('./src/routes/route');






// =====middleware=====
app.use(express.json());
app.use(cors());
app.use(route)
// ====database connection=====
const startServer = async () => {
  try {
    await dbConnection()

    app.listen(port, host, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error("Database connection failed:", error)
    process.exitCode = 1
  }
}

startServer()