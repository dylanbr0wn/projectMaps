import Api from './Api'

export default {

  getPlaces() {
    return Api().get('places')
  },

  searchPlace(query, page, itemsPerPage) {
    return Api().get('search/', {
      params: {
        search: query,
        page: page,
        itemsPerPage: itemsPerPage
      }
    })
  },

  getPlace(id) {
    return Api().get(`places/${id}`)
  },

  postPlace(place) {
    return Api().post('places', JSON.stringify(place), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  deletePlace(id) {
    return Api().delete(`places/${id}`)
  },
  putPlace(place,id) {
    return Api().put(`places/${id}`, JSON.stringify(place), {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

