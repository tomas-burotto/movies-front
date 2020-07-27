import axios from 'axios'
import { URL } from '../url'

export default async function createDesired(token, data) {
    const headers = {
        headers: {
            Authorization: token //the token is a variable which holds the token
        }
    }

    const body = {
        imdbid: data.imdbId,
        name: data.Title,
        description: data.Plot,
        score: data.imdbRating,
        image: data.Poster,
        genre: data.Genre
    }
    const response = await axios.post(URL + '/desireds', body, headers)
    console.log(response)
    return response
}