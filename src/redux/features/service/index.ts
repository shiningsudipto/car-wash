import baseApi from "../../api/baseAPi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceDetails: builder.query({
      query: ({ id }) => `/services/details/${id}`,
      providesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: (args) => {
        return {
          url: `/services?search=${args.keyword}&sortOrder=${args.sort}&minDuration=${args.minDuration}&maxDuration=${args.maxDuration}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
  }),
});

export const { useGetAllServicesQuery, useGetServiceDetailsQuery } = serviceApi;
