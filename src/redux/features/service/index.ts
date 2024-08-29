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
          url: `/services?search=${args?.keyword}&sortOrder=${args?.sort}&minDuration=${args?.minDuration}&maxDuration=${args?.maxDuration}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    getServices: builder.query({
      query: () => {
        return {
          url: `/services`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (serviceInfo) => ({
        url: "/services",
        method: "POST",
        body: serviceInfo,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useCreateServiceMutation,
} = serviceApi;
