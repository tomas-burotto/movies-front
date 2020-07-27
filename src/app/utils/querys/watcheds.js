import axios from 'axios'
import { URL } from '../url'

export default async function createWatched(token, data, score, comment) {
    const headers = {
        headers: {
            Authorization: token //the token is a variable which holds the token
        }
    }

    const body = {
        imdbid: data.imdbID,
        name: data.Title,
        description: data.Plot,
        score: score,
        image: data.Poster,
        genre: data.Genre,
        comment: comment
    }
    const response = await axios.post(URL + '/watcheds', body, headers)
    return response
}