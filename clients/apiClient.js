import axios from 'axios'

export class ApiClient {
  constructor(baseURL = '', headers = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      validateStatus: (status) => status >= 200 && status < 600,
    })

    this.client.interceptors.request.use((request) => {
      console.info(`[HTTP Request] -> ${request.method.toUpperCase()} ${request.url}`)
      console.info(`[Request data] ${JSON.stringify(request.data) || {}}`)

      return request
    })

    this.client.interceptors.response.use(
      (response) => {
        console.info(`[HTTP Response] <- ${response.status} ${response.statusText} (${response.duration}ms)`)
        if (response.status !== 500) {
          console.info(`[Response data] ${response ? JSON.stringify(response.data) : ""}`)

        }

        return response
      },
      (error) => {
        console.error(`[HTTP Error] ${JSON.stringify(error | 0)}`)

        return Promise.reject(error)
      }
    )
  }

  async get(url, queryParams = {}) {
    return this.client.get(url, { params: queryParams })
  }

  async post(url, data = {}) {
    return this.client.post(url, data)
  }

  async put(url, data = {}) {
    return this.client.put(url, data)
  }
}