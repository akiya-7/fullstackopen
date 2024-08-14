import axios from 'axios'

const baseUrl = 'https://fullstackopen-part03-winter-silence-9353.fly.dev/api/persons'
//const baseUrl = 'http://localhost:3000/api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {return response.data})
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {return response.data})
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {return response.data})
}

const deleteObject = (id, newObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject)
    return request.then(response => {return response.data})
}

export default {getAll, create, update, deleteObject}