import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (info)=>toast.success(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
    position:toast.POSITION.TOP_LEFT
});
export const infoToast = (info)=>toast.info(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
    position:toast.POSITION.TOP_LEFT
});
export const warningToast = (info)=>toast.warn(info,{
    hideProgressBar: false,
    autoClose: 2000,
    closeButton:false,
    theme:"colored",
    position:toast.POSITION.TOP_LEFT
});
export const loadingToast = ()=>toast.info("Fetching Data",{
    hideProgressBar: false,
    autoClose: 3000,
    closeButton:false,
    theme:"colored",
    position:toast.POSITION.TOP_LEFT
});

