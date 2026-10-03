import { customAlphabet } from "nanoid";


const otp =  customAlphabet("asdfjkl1234567890" , 6)
export function generateOtp (){
    return otp()
}