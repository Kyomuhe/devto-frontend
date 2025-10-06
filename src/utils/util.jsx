import axios from "axios"
import { serverUrl } from "../config/config"
import { Toaster as Sonner, toast } from "sonner"



export const makeRequest = async (endpoint, data, method) => {
    console.log(method)
    let response
    try {
        let url = serverUrl + endpoint
        console.log(url)
        
        // Check if data is FormData
        const isFormData = data instanceof FormData;
        
        const requestData = isFormData ? data : JSON.stringify(data);
        
        let config = {
            timeout: 4000
        }
        
        // Only set Content-Type for JSON requests
        if (!isFormData) {
            config.headers = { 'Content-Type': 'application/json' };
        }
        
        console.log('Is FormData:', isFormData); 
        console.log('Request data:', requestData); 
        
        switch(method) {
            case "Post": 
                response = await axios.post(url, requestData, config)
                break;
            case "Get":
                response = await axios.get(url, config)
                break;
            case "Put":
                response = await axios.put(url, requestData, config)
                break;
            case "Delete":
                response = await axios.delete(url, config)
                break;
            case "Patch":
                response = await axios.patch(url, requestData, config)
                break;
            default: 
                throw new Error("bad request")
        }
        
        console.log('Response:', response) 
        return response.data
    } catch (e) {
        console.error('Request error:', e); 
        if (e.response) {
            throw e;
        } else {
            throw new Error(e.message)
        }
    }
}

//toast
export const showToast = (message, type = "sucess") => {
    return toast(message )

}