import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GalleryCategoryDescriptionApi = createApi({
  reducerPath: "GalleryCategoryDescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["GalleryCategoryDescription"], // Define the tag type
  endpoints: (build) => ({
    createGalleryCategoryDescription: build.mutation({
      query: (data) => ({
        url: `/galleryCategoryDescription/create-galleryCategoryDescription`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GalleryCategoryDescription"],
    }),

    deleteGalleryCategoryDescription: build.mutation({
      query: (id) => ({
        url: `/galleryCategoryDescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GalleryCategoryDescription"],
    }),

    updateGalleryCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/galleryCategoryDescription/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GalleryCategoryDescription"],
    }),

    getSingleGalleryCategoryDescription: build.query({
      query: (id) => ({
        url: `/galleryCategoryDescription/${id}`,
      }),
      invalidatesTags: ["GalleryCategoryDescription"],
    }),
    getAllGalleryCategoryDescription: build.query({
      query: () => ({
        url: "/galleryCategoryDescription",
      }),
      providesTags: ["GalleryCategoryDescription"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateGalleryCategoryDescriptionMutation,
  useGetAllGalleryCategoryDescriptionQuery,
  useDeleteGalleryCategoryDescriptionMutation,
  useUpdateGalleryCategoryDescriptionMutation,
} = GalleryCategoryDescriptionApi;
