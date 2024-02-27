import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoGalleryApi = createApi({
  reducerPath: "videoGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1",
  }),

  tagTypes: ["VideoGallery"], // Define the tag type
  endpoints: (build) => ({
    createVideoGallery: build.mutation({
      query: (data) => ({
        url: "/videoGallery/create-videoGallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["VideoGallery"],
    }),

    deleteVideoGallery: build.mutation({
      query: (id) => ({
        url: `/videoGallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VideoGallery"],
    }),

    updateVideoGallery: build.mutation({
      query: ({ id, data }) => ({
        url: `/videoGallery/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["VideoGallery"],
    }),

    getAllVideoGallery: build.query({
      query: () => ({
        url: "/videoGallery",
      }),
      providesTags: ["VideoGallery"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateVideoGalleryMutation,
  useGetAllVideoGalleryQuery,
  useDeleteVideoGalleryMutation,
  useUpdateVideoGalleryMutation,
} = videoGalleryApi;
