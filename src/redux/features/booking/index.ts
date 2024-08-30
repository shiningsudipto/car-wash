import baseApi from "../../api/baseAPi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => `/bookings`,
      providesTags: ["Booking"],
    }),
    getMyBooking: builder.query({
      query: () => `/my-bookings`,
      providesTags: ["Booking"],
    }),
  }),
});

export const { useGetAllBookingsQuery, useGetMyBookingQuery } = bookingApi;
