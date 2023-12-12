import axios from 'axios'

import { HOST_API } from 'src/config-global'

const axiosInstance = axios.create({ baseURL: HOST_API })

export default axiosInstance

export const defaultNamespace = 'default'

export const endpoints = {
  apiPrefix: '/api/v1',
  nsPrefix: '/api/v1/namespaces',

  // Auth
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  // Network
  networkOrgs: '/network/organizations',
}
