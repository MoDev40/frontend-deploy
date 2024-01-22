import Cookies from 'js-cookie'
export const setToken = (token)=>{
   Cookies.set("token",token)
}
export const getToken = (token)=>{
   return Cookies.get("token")
}
export const removeToken = (token)=>{
   Cookies.remove("token")
   window.location.reload()
}

