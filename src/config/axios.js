import axios from 'axios'


// Do the system reloads
const success = res =>  res
const error = err => {
    if(401 === err.response.status) {
        window.location = '/' //load page
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)