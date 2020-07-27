import axios from 'axios'
import { URL } from '../url'

export default async function findWatcheds(token) {
    const headers = {
        headers: {
            Authorization: token //the token is a variable which holds the token
        }
    }
    const response = await axios.get(URL + '/user_watcheds', headers)
    return response
}