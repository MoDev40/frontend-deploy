import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { useFetchCategoryQuery } from '@/store/features/categorySlice'
import { useEffect, useState } from 'react'

const SelectType = ({setFormData,formData})=>{
    const {data = []} = useFetchCategoryQuery()
    const [indexes,setIndexes] = useState(0)
    useEffect(()=>{
      let indNum = data.findIndex( ind => ind.id === formData.itemType)
      if(indNum != -1){
        setIndexes(indNum)
      }else{
        console.log(data&& data[0]?.id);
      }
    },[formData.itemType])
    return(
        <Select onValueChange={ value =>{setFormData({...formData ,itemType:parseInt(value)})}}>
        <SelectTrigger>{indexes >= 0 && data[indexes]?.name}</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {
              data&& 
              data.map( category => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}

export default SelectType