import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'
const token = getToken()
const userSlice = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["user"],
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(userData)=>({
                url:"/login-user",
                method:"POST",
                body:userData
            }),
        }),
        invalidatesTags:["user"],
        userRegister:builder.mutation({
            query:(userData)=>({
                url:"/create-user",
                method:"POST",
                body:userData
            }),
            invalidatesTags:["user"]
        }),
        fetchUsers:builder.query({
            query:()=>({
                url:'/fetch/users'
            }),
            providesTags:["user"]
        }),
        fetchLogedUser:builder.query({
            query:()=>({
                url:'/fetch/users/loged-user'
            })
        }),
        updateUser:builder.mutation({
            query:({updated,id})=>({
                url:`/update-user/${id}`,
                method:"PUT",
                body:updated
            }),
            invalidatesTags:["user"]
        })
    })
})

export const {useLoginMutation,useFetchUsersQuery,useUserRegisterMutation,useUpdateUserMutation,useFetchLogedUserQuery} = userSlice
export default userSlice