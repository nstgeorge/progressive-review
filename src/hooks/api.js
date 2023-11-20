import { useQuery } from "@tanstack/react-query"

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://api.theprogressivereview.com/' : `http://${location.host}/api/`
const API_OPTIONS = {
  headers: {
    "Accept": 'application/json'
  }
}

export const useGet = (path) => {
  const url = new URL(path, BASE_URL)
  return useQuery({
    queryKey: path.split('/'),
    queryFn: async () => {
      const res = await fetch(url, API_OPTIONS)
      return await res.json()
    }
  })
}