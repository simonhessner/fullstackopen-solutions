import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
      }
    return request.then(response => response.data.concat(nonExisting))

}

const create = (newNote) => (
    axios.post(baseUrl, newNote).then(response => response.data)
)

const update = (id, newNote) => (
    axios.put(`${baseUrl}/${id}`, newNote).then(response => response.data)
)

export default { getAll, create, update }