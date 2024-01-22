import React from 'react'
import { useFetchCategoryQuery } from '@/store/features/categorySlice'
import Category from './Category'
import CreateCategDialog from './dialog/CreateCategDialog'
const Categories = () => {
  const {data:categories = []} = useFetchCategoryQuery()
  return (
    <div className='w-full space-y-4 p-4 flex flex-col'>
        <div>
        <CreateCategDialog/>
        </div>
        <Category categories={categories}/>
    </div>
  )
}

export default Categories