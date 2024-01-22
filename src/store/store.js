import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from './features/userSlice'
import categoryReducer from './features/categorySlice'
import itemReducer from './features/itemSlice'
import transActionReducer from './features/transactionSlice'
import noficationSlice from './features/notificationSlice'
import reportReducer from './features/reportSlice'
export const store = configureStore({
    reducer: {
        [userReducer.reducerPath] : userReducer.reducer,
        [categoryReducer.reducerPath] : categoryReducer.reducer,
        [itemReducer.reducerPath] : itemReducer.reducer,
        [transActionReducer.reducerPath]: transActionReducer.reducer,
        [noficationSlice.reducerPath] : noficationSlice.reducer,
        [reportReducer.reducerPath] : reportReducer.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
        .concat(userReducer.middleware)
        .concat(categoryReducer.middleware)
        .concat(itemReducer.middleware)
        .concat(transActionReducer.middleware)
        .concat(reportReducer.middleware)
        .concat(noficationSlice.middleware)
})

setupListeners(store.dispatch)

