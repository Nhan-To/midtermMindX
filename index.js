import express from "express"
import mongoose from "mongoose"
import "dotenv/config.js"
import routesFn from "./routes/index.js"

const app = express()
app.use(express.json())


routesFn(app)

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to DB")
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
})
.catch(err => console.error(err))

