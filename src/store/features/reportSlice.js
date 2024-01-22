import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'

const token = getToken()                 
const reportSlice = createApi({
    reducerPath:"reportApi",

    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers) => {
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["report"],
    endpoints:(builder)=>({
        fetchDailyRep:builder.query({
            query:()=>{
                return({
                    url:"/fetch/daily-report",
                })
            },
            providesTags:["report"]
        }),
        fetchDailyItemRep:builder.query({
            query:(id)=>{
                return({
                    url:"/fetch/daily-item-report/"+id,
                })
            },
            providesTags:["report"]
        }),
        fetchMonthlyRep:builder.query({
            query:(date)=>{
                return({
                    url:`/fetch/monthly-report/${date}`  ,
                })
            },
            providesTags:["report"]
        }),
        fetchMonthlyItemRep:builder.query({
            query:({date,id})=>{
                return({
                    url:`/fetch/monthly-item-report/${date}/${id}`  ,
                })
            },
            providesTags:["report"]
        }),
    })
})

export const {useFetchDailyRepQuery,useFetchMonthlyRepQuery,useFetchDailyItemRepQuery,useFetchMonthlyItemRepQuery} = reportSlice
export default reportSlice