import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: "https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/"

    })
}