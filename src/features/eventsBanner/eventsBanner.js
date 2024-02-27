import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EventsBannerApi = createApi({
  reducerPath: "EventsBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1/",
  }),

  tagTypes: ["EventsBanner"], // Define the tag type
  endpoints: (build) => ({
    createEventsBanner: build.mutation({
      query: (data) => ({
        url: "/eventsBanner/create-eventsBanner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EventsBanner"],
    }),

    deleteEventsBanner: build.mutation({
      query: (id) => ({
        url: `/eventsBanner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventsBanner"],
    }),

    updateEventsBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `/eventsBanner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EventsBanner"],
    }),

    getAllEventsBanner: build.query({
      query: () => ({
        url: "/eventsBanner",
      }),
      providesTags: ["EventsBanner"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateEventsBannerMutation,
  useGetAllEventsBannerQuery,
  useDeleteEventsBannerMutation,
  useUpdateEventsBannerMutation,
} = EventsBannerApi;
