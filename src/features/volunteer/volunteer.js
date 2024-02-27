import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VolunteerApi = createApi({
  reducerPath: "VolunteerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1",
  }),

  tagTypes: ["Volunteer"], // Define the tag type
  endpoints: (build) => ({
    createVolunteer: build.mutation({
      query: (data) => ({
        url: "/volunteer/create-volunteer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Volunteer"],
    }),

    deleteVolunteer: build.mutation({
      query: (id) => ({
        url: `/volunteer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Volunteer"],
    }),

    updateVolunteer: build.mutation({
      query: ({ id, data }) => ({
        url: `/volunteer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Volunteer"],
    }),

    getAllVolunteer: build.query({
      query: () => ({
        url: "/volunteer",
      }),
      providesTags: ["Volunteer"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateVolunteerMutation,
  useGetAllVolunteerQuery,
  useDeleteVolunteerMutation,
  useUpdateVolunteerMutation,
} = VolunteerApi;
