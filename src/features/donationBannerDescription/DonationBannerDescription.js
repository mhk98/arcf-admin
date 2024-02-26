import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const donationCategoryDescriptionApi = createApi({
  reducerPath: "donationCategoryDescriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server.arcfbd.org/api/v1",
  }),

  tagTypes: ["donationCategoryDescription"], // Define the tag type
  endpoints: (build) => ({
    createDonationCategoryDescription: build.mutation({
      query: (data) => ({
        url: `/donationCategoryDescription/create-donationCategoryDescription`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["donationCategoryDescription"],
    }),

    deleteDonationCategoryDescription: build.mutation({
      query: (id) => ({
        url: `/donationCategoryDescription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["donationCategoryDescription"],
    }),

    updateDonationCategoryDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `/donationCategoryDescription/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["donationCategoryDescription"],
    }),

    getSingleDonationCategoryDescription: build.query({
      query: (id) => ({
        url: `/donationCategoryDescription/${id}`,
      }),
      invalidatesTags: ["donationCategoryDescription"],
    }),
    getAllDonationCategoryDescription: build.query({
      query: () => ({
        url: "/donationCategoryDescription",
      }),
      providesTags: ["donationCategoryDescription"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateDonationCategoryDescriptionMutation,
  useGetAllDonationCategoryDescriptionQuery,
  useDeleteDonationCategoryDescriptionMutation,
  useUpdateDonationCategoryDescriptionMutation,
} = donationCategoryDescriptionApi;
