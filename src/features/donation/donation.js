import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["donation"], // Define the tag type
  endpoints: (build) => ({
    createDonation: build.mutation({
      query: (data) => ({
        url: "/donation/create-donation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),

    deleteDonation: build.mutation({
      query: (id) => ({
        url: `/donation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["donation"],
    }),

    updateDonation: build.mutation({
      query: ({ id, data }) => ({
        url: `/donation/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["donation"],
    }),

    getAllDonation: build.query({
      query: () => ({
        url: "/donation",
      }),
      providesTags: ["donation"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetAllDonationQuery,
  useDeleteDonationMutation,
  useUpdateDonationMutation,
} = donationApi;
