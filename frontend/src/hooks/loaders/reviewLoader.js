import { BASE_URL } from "../api"

export const reviewQuery = (id) => ({
  queryKey: ['reviews', 'detail', id],
  queryFn: async () => await (await fetch(new URL(`api/reviews/${id}?populate[album][populate]=*`, BASE_URL))).json()
})

export const reviewLoader = (queryClient) => async ({ params }) => {
  return await queryClient.ensureQueryData(reviewQuery(params.reviewId))
}