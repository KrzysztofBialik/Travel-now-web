export const URL_PREFIX = process.env.NODE_ENV === 'development' ? 'http://51.132.58.149:8080' : '';

export const doGet = (endpoint) => {
    const headers = addAuthorizationHeader({
        'Accept': 'application/json',
    })

    const url = endpoint.startsWith("http") ? endpoint : URL_PREFIX + endpoint;

    return fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then(response => checkForError(response))
}

export const doPost = (endpoint, body = {}, authorize = true) => {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (authorize) {
        headers = addAuthorizationHeader(headers)
    }

    return fetch(URL_PREFIX + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(response => checkForError(response))
}

export const doPatch = (endpoint, body = {}) => {
    const headers = addAuthorizationHeader({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    })

    return fetch(URL_PREFIX + endpoint, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(response => checkForError(response))
}

export const doDelete = (endpoint) => {
    const headers = addAuthorizationHeader({
        'Accept': 'application/json',
    })

    return fetch(URL_PREFIX + endpoint, {
        method: 'DELETE',
        headers: headers
    })
        .then(response => checkForError(response))
}

export const doPut = (endpoint) => {
    const headers = addAuthorizationHeader({
        'Accept': 'application/json',
    })

    return fetch(URL_PREFIX + endpoint, {
        method: 'PUT',
        headers: headers
    })
        .then(response => checkForError(response))
}
const addAuthorizationHeader = (headers) => {
    const jwt = localStorage.getItem("ACCESS_TOKEN")

    if (jwt) {
        return {
            ...headers,
            Authorization: `Bearer ${jwt}`,
        }
    }

    return headers
}

const checkForError = async (response) => {
    if (!response.ok) {
        if (response.headers.get('content-type') === 'application/json') {
            const json = await response.json()
            throw new Error(json.message)
        }

        if(response.status === 401) {
            throw new Error("401")
        }
        throw new Error("Something went wrong")
    }
    return response
}