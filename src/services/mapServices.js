import Api from './mapAPi'

export default {
    getElevation(lng,lat){
        return Api().get(`${lng},${lat}.json`,{
            params:{
                layers: 'contour',
                limit:50,
                access_token: process.env.REACT_APP_MAPBOX_TOKEN
            }
        })
    }
}