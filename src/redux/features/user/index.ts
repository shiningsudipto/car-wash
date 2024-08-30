import baseApi from "../../api/baseAPi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ userRole, id }) => ({
        url: `/update-user/${id}`,
        method: "PUT",
        body: userRole,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = userApi;
