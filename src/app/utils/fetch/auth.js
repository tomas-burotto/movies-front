  
import axios from 'axios'
import {URL} from '../url'

export default async function authentication(email,password) {
    const data = {user: {
        email,
        password
    }}
    const response = await axios.post(URL+'/login',data)
    console.log(response)
    return response
}