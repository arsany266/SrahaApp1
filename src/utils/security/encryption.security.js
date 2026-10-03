import crypto from "node:crypto"
import { ENCRYPTION_SECRET_KEY } from "../../../config/confi.service.js";
 
const IV_LENGTH=16;
const ENCRYPTION_SECRET_KEY1= ENCRYPTION_SECRET_KEY


export const encrypt = async(text)=>{
const iv = crypto.randomBytes(IV_LENGTH)
// console.log({iv});
const ciper = crypto.createCipheriv("aes-256-cbc" ,ENCRYPTION_SECRET_KEY1 , iv )
// console.log({ciper});
let encryptedData = ciper.update(text , "utf-8" , "hex")
// console.log({encryptedData});
encryptedData += ciper.final("hex")
return `${iv.toString("hex")}:${encryptedData}`

}

export const decrypt = async(encryptedData)=>{
const [iv ,encryptedText ] = encryptedData.split(":")
const binaryLike = Buffer.from(iv , "hex")
const deciper = crypto.createDecipheriv("aes-256-cbc" ,ENCRYPTION_SECRET_KEY1 , binaryLike )
// console.log({deciper});
 let decryptedData = deciper.update(encryptedText ,"hex" ,"utf-8" )
decryptedData += deciper.final("utf-8")
return decryptedData
}