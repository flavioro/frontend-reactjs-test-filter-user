import axios from 'axios'

const getUsers = async () => await axios.get('/users')

export { getUsers }
