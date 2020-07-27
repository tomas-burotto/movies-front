import axios from 'axios'
import {omdb} from '../omdb'

export default async function getTitle(title) {
    const params = {params: {
        t: title,
        apikey: '4b6b042d'
    }}
    const response = await axios.get(omdb+'/',params)
    return response
}