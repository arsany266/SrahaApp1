import {resolve} from "node:path"
import dotenv from"dotenv"

const envPath = {
    development : `.env.dev`,
    production  : '.env.prod'

}

dotenv.config({path :  resolve(`./config/${envPath.development}`)})
export const PORT = process.env.PORT ||5000
export const DB_URI = process.env.DB_URI
export const SALT = parseInt(process.env.SALT)
export const ENCRYPTION_SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY
export const TOKEN_ACCESS_USER_SECRET_KEY = process.env.TOKEN_ACCESS_USER_SECRET_KEY
export const TOKEN_REFRESH_USER_SECRET_KEY = process.env.TOKEN_REFRESH_USER_SECRET_KEY

export const TOKEN_ACCESS_ADMIN_SECRET_KEY = process.env.TOKEN_ACCESS_ADMIN_SECRET_KEY
export const TOKEN_REFRESH_ADMIN_SECRET_KEY = process.env.TOKEN_REFRESH_ADMIN_SECRET_KEY

export const ACCESS_EXPIRES = parseInt(process.env.ACCESS_EXPIRES)
export const REFRSH_EXPIRES = process.env.REFRSH_EXPIRES
export const CLIENT_ID = process.env.CLIENT_ID
export const REDIS_URI = process.env.REDIS_URI
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASS = process.env.SMTP_PASS
export const WHITE_LIST = process.env.WHITE_LIST








