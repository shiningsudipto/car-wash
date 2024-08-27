import baseApi from "../../api/baseAPi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTwoRatings: builder.query({
      query: () => `/review?number=2`,
    }),
    getAllRatings: builder.query({
      query: () => `/review`,
    }),
  }),
});

export const { useGetLatestTwoRatingsQuery, useGetAllRatingsQuery } = ratingApi;
