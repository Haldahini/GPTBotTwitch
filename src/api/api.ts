import axios from 'axios'
import config from './api.conf'

const instance = axios.create(config)

instance.interceptors.request.use(
    (request) => {
        return request
    },
    async (error) => {
        return await Promise.reject(error)
    }
)

export default instance
