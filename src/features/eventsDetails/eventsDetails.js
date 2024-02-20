import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EventsDetailsApi = createApi({
  reducerPath: "EventsDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["EventsDetails"], // Define the tag type
  endpoints: (build) => ({
    createEventsDetails: build.mutation({
      query: (data) => ({
        url: "/eventsDetails/create-eventsDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EventsDetails"],
    }),

    deleteEventsDetails: build.mutation({
      query: (id) => ({
        url: `/eventsDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventsDetails"],
    }),

    updateEventsDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/eventsDetails/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EventsDetails"],
    }),

    getAllEventsDetails: build.query({
      query: () => ({
        url: "/eventsDetails",
      }),
      providesTags: ["EventsDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateEventsDetailsMutation,
  useGetAllEventsDetailsQuery,
  useDeleteEventsDetailsMutation,
  useUpdateEventsDetailsMutation,
} = EventsDetailsApi;
