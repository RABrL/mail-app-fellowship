import axios from "axios";



export const getEmailsByUser = async (userId:number) => {
  try {
    return await axios.get(`http://0.0.0.0:8000/mails/juan1010.jerm@gmail.com/`)
  } catch (error) {
    console.error();
  }
}


export const getAnEmail = async (emailId:number) => {
  try {
    return await axios.get(`http://0.0.0.0:8000/mail/${emailId}/`)
  } catch (error) {
    console.error();
  }
}
