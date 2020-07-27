import axios from 'axios'
import { URL } from '../url'

export default async function disconnect(token) {
    const headers = {
        headers: {
            Authorization: token //the token is a variable which holds the token
        }
    }
    const response = await axios.delete(URL + '/logout', headers)

    return response
}