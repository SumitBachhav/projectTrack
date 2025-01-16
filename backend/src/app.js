import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import
import userRouter from './routes/user.route.js'
import studentRouter from './routes/student.ruote.js'

//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter)
// app.use("/api/v1/users", userRouter)
app.use("/backendApi/v1/student", studentRouter)


// http://localhost:8000/api/v1/users/register

export { app }