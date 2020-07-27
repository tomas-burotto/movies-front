import axios from 'axios'
import {URL} from '../url'

export default async function createUser(email,password) {
    const data = {user: {
        email,
        password
    }}
    const response = await axios.post(URL+'/signup',data)
    return response
}