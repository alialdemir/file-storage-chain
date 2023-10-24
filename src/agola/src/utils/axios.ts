import axios, { AxiosRequestConfig } from 'axios'

import { HOST_API } from 'src/config-global'

const axiosInstance = axios.create({ baseURL: HOST_API })

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args]

  const res = await axiosInstance.get(url, { ...config })

  return res.data
}
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
