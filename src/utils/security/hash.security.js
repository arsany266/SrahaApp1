import { SALT } from "../../../config/confi.service.js";
import bcrypt from "bcrypt"



export const generateHash = async (plainText , salt = SALT )=>{
let hashResult = await bcrypt.hash(plainText , salt)
return hashResult
}


export const compareHash = async (plainText , cipherText )=>{
let hashResult = await bcrypt.compare(plainText , cipherText)
return hashResult
}

// export const compareHash = async (pa)