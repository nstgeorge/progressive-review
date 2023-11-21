import { useQuery } from "@tanstack/react-query"

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://theprogressivereview.com/cms/' : `http://${location.host}/cms/`
const API_OPTIONS = {
  headers: {
    "Accept": 'application/json'
  }
}

export const useGet = (path) => {
  const url = new URL(`api/${path}`, BASE_URL)
  return useQuery({
    queryKey: path.split('/'),
    queryFn: async () => {
      const res = await fetch(url, API_OPTIONS)
      return await res.json()
    }
  })
}