import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'

const token = getToken()                 
const noficationSlice = createApi({
    reducerPath:"ntifyApi",

    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["notification"],
    endpoints:(builder)=>({
        fetchUserNotif:builder.query({
            query:()=>({
                url:"/fetch/user-nofication"
            }),
            providesTags:["notification"],
        }),
        createNotif:builder.mutation({
            query:()=>({
                url:"/create-nofication",
                method:"POST",
            }),
            invalidatesTags:["notification"],
        }),
        deleteNotif:builder.mutation({
            query:(id)=>({
                url:"/delete-nofication/"+id,
                method:"DELETE",
            }),
            invalidatesTags:["notification"],
        }),
    })
})

export const {useCreateNotifMutation,useFetchUserNotifQuery,useDeleteNotifMutation} = noficationSlice
export default noficationSlice