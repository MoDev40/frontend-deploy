import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import BASE_URL from '../baseURL'
import { getToken } from '@/lib/cookies'
const token = getToken()
const categorySlice = createApi({
    reducerPath:"categoryApi",
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders:(headers)=>{
            if(token){
                headers.set('Authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["category"],
    endpoints:(builder)=>({
        fetchCategory:builder.query({
            query:()=>({
                url:"/categories"
            }),
            providesTags:["category"]
        }),
        createCategory:builder.mutation({
            query:(newCateg)=>({
                url:"/create-categories",
                method:"POST",
                body:newCateg
            }),
            invalidatesTags:["category"]
        }),
        updateCategory:builder.mutation({
            query:({updateCateg,id})=>({
                url:`/update-categories/${id}`,
                method:"PUT",
                body:updateCateg
            }),
            invalidatesTags:["category"]
        }),
        deleteCategory:builder.mutation({
            query:(id)=>({
                url:`/delete-categories/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["category"]
        }),
    })
})

export const {useFetchCategoryQuery,useCreateCategoryMutation,useDeleteCategoryMutation,useUpdateCategoryMutation} = categorySlice
export default categorySlice