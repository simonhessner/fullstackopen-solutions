import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const addPerson = (newPerson) => {
    return axios
      .post(baseUrl, newPerson)
      .then(response => response.data)
}

const deletePerson = (person) => {
    return axios
        .delete(`${baseUrl}/${person.id}`)
        .then(response => response.data)
}

const replacePerson = (person) => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
}

export default {
    getAllPersons,
    addPerson,
    deletePerson,
    replacePerson
}