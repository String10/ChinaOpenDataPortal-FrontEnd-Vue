import axios from 'axios'

export async function search(query: string) {
  const backend_host = import.meta.env.VITE_BACKEND_HOST
  if (!backend_host) {
    console.error('VUE_APP_BACKEND_HOST is not set')
    return {}
  }
  try {
    const response = await axios.get(`${backend_host}/search`, {
      params: {
        q: query
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
  return {}
}
