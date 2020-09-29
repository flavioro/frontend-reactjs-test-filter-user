import React from 'react'
import { Home } from './components'

import axios from 'axios'
axios.defaults.baseURL = 'https://random-persons.herokuapp.com'

export default () => <Home />
