import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'

const token = getToken()                 
const itemSlice = createApi({
    reducerPath:"itemApi",

    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["items"],
    endpoints:(builder)=>({
        createItem:builder.mutation({
            query:(newItem)=>({
                url:"/create-items",
                method:"POST",
                body:newItem,
            }),
            invalidatesTags:["items"]
        }),
        updateItem:builder.mutation({
            query:({updated,id})=>({
                url:`/update-item/${id}`,
                method:"PUT",
                body:updated,
            }),
            invalidatesTags:["items"]
        }),
        fetchUserItem:builder.query({
            query:({counter,typeID})=>{
                return({
                    url:`/fetch/user-items/${counter}/${typeID}`,
                })
            },
            skipCache: true,
            providesTags:[],
        }),
    }),
})

export const {useCreateItemMutation,useFetchUserItemQuery,useUpdateItemMutation} = itemSlice
export default itemSlice