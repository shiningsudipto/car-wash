import baseApi from "../../api/baseAPi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllServices: builder.query({
    //   query: () => `/services`,
    //   providesTags: ["Service"],
    // }),
    getAllServices: builder.query({
      query: (args) => {
        console.log("args", args);
        return {
          url: `/services?search=${args.keyword}&sortOrder=${args.sort}&minDuration=${args.minDuration}&maxDuration=${args.maxDuration}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useGetAllServicesQuery, useLoginMutation } = serviceApi;
