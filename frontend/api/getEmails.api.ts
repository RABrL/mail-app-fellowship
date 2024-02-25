import axios from "axios";

export const getEmailsByUser = async (userId:number) => {
  try {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}mails/received/juan1010.jerm@gmail.com`)
  } catch (error) {
    console.error();
  }
}


export const getAnEmail = async (emailId:number) => {
  try {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}mails/received/${emailId}`)
  } catch (error) {
    console.error();
  }
}
