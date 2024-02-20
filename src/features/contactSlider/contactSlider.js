import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactSliderApi = createApi({
  reducerPath: "contactSliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["contactSlider"], // Define the tag type
  endpoints: (build) => ({
    createContactSlider: build.mutation({
      query: (data) => ({
        url: "/contactSlider/create-contactSlider",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contactSlider"],
    }),

    deleteContactSlider: build.mutation({
      query: (id) => ({
        url: `/contactSlider/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contactSlider"],
    }),

    updateContactSlider: build.mutation({
      query: ({ id, data }) => ({
        url: `/contactSlider/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contactSlider"],
    }),

    getAllContactSlider: build.query({
      query: () => ({
        url: "/contactSlider",
      }),
      providesTags: ["contactSlider"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateContactSliderMutation,
  useGetAllContactSliderQuery,
  useDeleteContactSliderMutation,
  useUpdateContactSliderMutation,
} = contactSliderApi;
