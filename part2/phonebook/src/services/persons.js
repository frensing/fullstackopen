import axios from "axios"

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then(response => response.data)
}

const updatePerson = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then(res => res.data)
}

const deletePerson = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
}

export default {getAll, createPerson, updatePerson, deletePerson}