import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: (process.env._ && process.env._.indexOf("heroku")) ? process.env.API_URL : 'http://localhost:8000/'

    })
}