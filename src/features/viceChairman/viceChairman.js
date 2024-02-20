import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const viceChairmanApi = createApi({
  reducerPath: "viceChairmanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["chairman"], // Define the tag type
  endpoints: (build) => ({
    createViceChairman: build.mutation({
      query: (data) => ({
        url: "/viceChairman/create-viceChairman",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ViceChairman"],
    }),

    deleteViceChairman: build.mutation({
      query: (id) => ({
        url: `/viceChairman/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ViceChairman"],
    }),

    updateViceChairman: build.mutation({
      query: ({ id, data }) => ({
        url: `/viceChairman/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ViceChairman"],
    }),

    getAllViceChairman: build.query({
      query: () => ({
        url: "/viceChairman",
      }),
      providesTags: ["ViceChairman"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateViceChairmanMutation,
  useGetAllViceChairmanQuery,
  useDeleteViceChairmanMutation,
  useUpdateViceChairmanMutation,
} = viceChairmanApi;
