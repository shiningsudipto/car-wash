import baseApi from "../../api/baseAPi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: () => `/slots/all-slots`,
      providesTags: ["Slot"],
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

export const { useGetAllSlotsQuery } = slotApi;
