import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageGalleryApi = createApi({
  reducerPath: "imageGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["ImageGallery"], // Define the tag type
  endpoints: (build) => ({
    createImageGallery: build.mutation({
      query: (data) => ({
        url: "/imageGallery/create-imageGallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ImageGallery"],
    }),

    deleteImageGallery: build.mutation({
      query: (id) => ({
        url: `/imageGallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImageGallery"],
    }),

    updateImageGallery: build.mutation({
      query: ({ id, data }) => ({
        url: `/imageGallery/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ImageGallery"],
    }),

    getAllImageGallery: build.query({
      query: () => ({
        url: "/imageGallery",
      }),
      providesTags: ["ImageGallery"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateImageGalleryMutation,
  useGetAllImageGalleryQuery,
  useDeleteImageGalleryMutation,
  useUpdateImageGalleryMutation,
} = imageGalleryApi;
