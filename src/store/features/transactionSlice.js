import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'

const token = getToken()                 
const transActionSlice = createApi({
    reducerPath:"transApi",

    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["trans"],
    endpoints:(builder)=>({
        fetchUserTrans:builder.query({
            query:({counter,date})=>{
                return({
                    url:`/fetch/user-transactions/${counter}/${date}`,
                })
            },
            providesTags:["trans"]
        }),
        createTransaction:builder.mutation({
            query:(newTrans)=>({
                url:"create-transaction",
                method:"POST",
                body:newTrans
            }),
            invalidatesTags:["trans"]
        }),
       updateTransaction:builder.mutation({
            query:(updated)=>({
                url:"/update-transaction",
                method:"PUT",
                body:updated
            }),
            invalidatesTags:["trans"]
        })
    }),
})

export const {useFetchUserTransQuery,useCreateTransactionMutation,useUpdateTransactionMutation} = transActionSlice
export default transActionSlice