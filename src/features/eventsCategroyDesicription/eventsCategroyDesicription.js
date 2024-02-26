import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsCategoryDescriptionApi = createApi({
  reducerPath: "eventsCategoryDescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["eventsCategoryDescription"], // Define the tag type
  endpoints: (build) => ({
    createEventsCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/eventsCategoryDescription/create-eventsCategoryDescription/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["eventsCategoryDescription"],
    }),

    deleteEventsCategoryDescription: build.mutation({
      query: (id) => ({
        url: `/eventsCategoryDescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["eventsCategoryDescription"],
    }),

    updateEventsCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/eventsCategoryDescription/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["eventsCategoryDescription"],
    }),

    getSingleEventsCategoryDescription: build.query({
      query: (id) => ({
        url: `/eventsCategoryDescription/${id}`,
      }),
      invalidatesTags: ["eventsCategoryDescription"],
    }),
    getAllEventsCategoryDescription: build.query({
      query: () => ({
        url: "/eventsCategoryDescription",
      }),
      providesTags: ["eventsCategoryDescription"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateEventsCategoryDescriptionMutation,
  useGetAllEventsCategoryDescriptionQuery,
  useGetSingleEventsCategoryDescriptionQuery,
  useDeleteEventsCategoryDescriptionMutation,
  useUpdateEventsCategoryDescriptionMutation,
} = eventsCategoryDescriptionApi;
