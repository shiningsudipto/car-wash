import baseApi from "../../api/baseAPi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => `/bookings`,
      providesTags: ["Booking"],
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

export const { useGetAllBookingsQuery } = bookingApi;
