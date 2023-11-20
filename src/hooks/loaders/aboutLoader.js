import { BASE_URL } from "../api"

export const aboutQuery = (id) => ({
  queryKey: [id],
  queryFn: async () => await (await fetch(new URL(id, BASE_URL))).json()
})

export const aboutLoader = (queryClient) => async ({ params }) => {
  return await queryClient.ensureQueryData(aboutQuery(params.aboutId ?? 'about'))
}