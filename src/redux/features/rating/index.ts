import baseApi from "../../api/baseAPi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTwoRatings: builder.query({
      query: () => `/review?number=2`,
    }),
    getAllRatings: builder.query({
      query: () => `/review`,
    }),
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: "/review",
        method: "POST",
        body: reviewInfo,
      }),
    }),
  }),
});

export const {
  useGetLatestTwoRatingsQuery,
  useGetAllRatingsQuery,
  useCreateReviewMutation,
} = ratingApi;
