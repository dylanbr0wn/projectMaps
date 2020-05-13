import Api from "./Api";

export const getPlaces = () => {
    return Api().get("places").then(handleResponse).catch(handleError);
};

export const searchPlace = (query, page, itemsPerPage) => {
    return Api().get("search/", {
        params: {
            search: query,
            page: page,
            itemsPerPage: itemsPerPage,
        },
    });
};

export const getPlace = id => {
    return Api().get(`places/${id}`).then(handleResponse).catch(handleError);
};

export const postPlace = place => {
    return Api()
        .post("places", JSON.stringify(place), {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(handleResponse)
        .catch(handleError);
};
export const deletePlace = id => {
    return Api().delete(`places/${id}`).then(handleResponse).catch(handleError);
};
export const putPlace = (place, id) => {
    return Api()
        .put(`places/${id}`, JSON.stringify(place), {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(handleResponse)
        .catch(handleError);
};

const handleResponse = res => {
    if (res.data) return res.data;
    return res;
};

const handleError = error => {
    console.log(error.response);
};
