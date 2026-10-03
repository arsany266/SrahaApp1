import express from "express"
import { bootstrap } from "./src/app.controller.js"
import { PORT } from "./config/confi.service.js"
import chalk from "chalk"



const app = express()
bootstrap(app,express)
app.listen(PORT,()=> console.log(chalk.bgGreen(`listening on port ${PORT}`)))


