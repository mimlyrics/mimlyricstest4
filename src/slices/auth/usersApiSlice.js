import { apiSlice } from './../apiSlice';
const USERS_URL = "/api/v1";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/jwt/auth`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/jwt/register`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/jwt/logout`,
                method: "POST",
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
            url: `${USERS_URL}/jwt/profile`,
            method: "PUT",
            body: data,
        })
        }),
        getUsers: builder.mutation
    })
})

export const {useLoginMutation, useLogoutMutation, 
    useRegisterMutation, useUpdateUserMutation} = usersApiSlice;